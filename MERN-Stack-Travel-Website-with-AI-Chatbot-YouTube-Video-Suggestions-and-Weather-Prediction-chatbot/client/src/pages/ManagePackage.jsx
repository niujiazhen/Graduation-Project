import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialFormData = {
  packageName: "",
  packageDescription: "",
  packageDestination: "",
  packageDays: 1,
  packageNights: 1,
  packageMeals: "",
  packageAccommodation: "",
  packageTransportation: "",
  packageGear: "",
  packageActivities: "",
  packagePrice: 0,
  packageDiscountPrice: 0,
  packageOffer: false,
  packageImages: [],
};

const fieldLabels = {
  packageName: "徒步计划名称",
  packageDescription: "徒步计划描述",
  packageDestination: "徒步目的地",
  packageDays: "徒步天数",
  packageNights: "徒步夜数",
  packageAccommodation: "住宿安排",
  packageTransportation: "交通方式",
  packageGear: "徒步推荐装备",
  packageActivities: "徒步活动内容",
  packagePrice: "预计花费",
  packageImages: "上传图片",
};

const excludedFields = ["packageMeals", "packageDiscountPrice", "packageOffer"];



const ManagePackage = () => {
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    const res = await fetch("/api/package/get-packages");
    const data = await res.json();
    setPackages(data?.packages || []);
  };

  const openModal = (pkg = null) => {
    if (pkg) {
      setFormData({ ...pkg, packageImages: [] });
      setPreviewImages(pkg.packageImages || []);
      setIsEditing(true);
      setEditId(pkg._id);
    } else {
      setFormData(initialFormData);
      setPreviewImages([]);
      setIsEditing(false);
      setEditId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, packageImages: files });

    const preview = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(preview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    const form = new FormData();
    for (let key in formData) {
      if (key === "packageImages") {
        formData.packageImages.forEach((img) => form.append("packageImages",img));
      } else {
        form.append(key, formData[key]);
      }
    }

    try {
      const url = isEditing
        ? `/api/package/update-package/${editId}`
        : "/api/package/create-package";
      const method = isEditing ? "POST" : "POST";
      console.log("URL:", url);
      console.log("Method:", method);
      console.log("Form Data:", formData);
      console.log("Form:", form);
      for (let [key, value] of form.entries()) {
        console.log(`${key}:`, value);
      }

      await fetch(url, {
        method,
        body: form,
      });

      closeModal();
      fetchPackages();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("确定要删除该路线吗？")) return;
    await fetch(`/api/package/delete-package/${id}`, { method: "DELETE" });
    fetchPackages();
  };

  return (
    <div className="p-6 mt-[70px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">管理徒步路线</h2>
        <button
          onClick={() => openModal()}
          className="bg-green-600 text-white px-4 py-2 rounded hover:opacity-90"
        >
          添加路线
        </button>
      </div>

      {/* Package Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {packages.map((pkg) => (
          <div key={pkg._id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{pkg.packageName}</h3>
            <p>{pkg.packageDescription}</p>
            <p>目的地: {pkg.packageDestination}</p>
            <p>天数: {pkg.packageDays} 天 / {pkg.packageNights} 夜</p>
            <p>预计花费: ¥{pkg.packagePrice}</p>
            {pkg.packageImages?.[0] && (
              <img
                src={pkg.packageImages[0]}
                alt="preview"
                className="w-full h-32 object-cover mt-2"
              />
            )}
            <div className="flex justify-between mt-3">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded"
                onClick={() => openModal(pkg)}
              >
                修改
              </button>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(pkg._id)}
              >
                删除
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "修改路线" : "添加新路线"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(initialFormData).map(([key, value]) => {
                if (excludedFields.includes(key)) return null; // 跳过不展示的字段
                if (key === "packageOffer") {
                  return (
                    <div key={key} className="flex items-center gap-2">
                      <label className="font-semibold">优惠:</label>
                      <input
                        type="checkbox"
                        id="packageOffer"
                        checked={formData.packageOffer}
                        onChange={handleInputChange}
                      />
                    </div>
                  );
                }
                if (key === "packageImages") {
                  return (
                    <div key={key} className="col-span-full">
                      <label className="font-semibold block">上传图片:</label>
                      <input type="file" multiple onChange={handleFileChange} />
                      <div className="flex gap-2 mt-2">
                        {previewImages.map((img, idx) => (
                          <img key={idx} src={img} alt="preview" className="w-16 h-16 object-cover" />
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={key}>
                    <label className="font-semibold block">{fieldLabels[key] || key}:</label>

                    <input
                      id={key}
                      value={formData[key]}
                      onChange={handleInputChange}
                      type={typeof value === "number" ? "number" : "text"}
                      className="border p-2 w-full rounded"
                    />
                  </div>
                );
              })}
              <div className="col-span-full flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:opacity-90"
                >
                  {isEditing ? "更新路线" : "添加路线"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePackage;
