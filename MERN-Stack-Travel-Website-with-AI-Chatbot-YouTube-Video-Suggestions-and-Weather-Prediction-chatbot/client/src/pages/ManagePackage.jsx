import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";

const ManagePackage = () => {
  const [packages, setPackages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [formData, setFormData] = useState({
    packageName: "",
    packageDescription: "",
    packageDestination: "",
    packageDays: 1,
    packageNights: 1,
    packageAccommodation: "",
    packageTransportation: "",
    packageGear: "",
    packageActivities: "",
    packagePrice: 0,
    packageDiscountPrice: 0,
    packageOffer: false,
    packageImages: [],
  });

  const fetchPackages = async () => {
    const res = await axios.get("/api/packages");
    setPackages(res.data);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const openModal = (pkg = null) => {
    if (pkg) {
      setFormData({ ...pkg });
      setSelectedPackageId(pkg._id);
      setIsEditing(true);
    } else {
      setFormData({
        packageName: "",
        packageDescription: "",
        packageDestination: "",
        packageDays: 1,
        packageNights: 1,
        packageAccommodation: "",
        packageTransportation: "",
        packageGear: "",
        packageActivities: "",
        packagePrice: 0,
        packageDiscountPrice: 0,
        packageOffer: false,
        packageImages: [],
      });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPackageId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (key === "packageImages") {
        formData.packageImages.forEach((file) => data.append("packageImages", file));
      } else {
        data.append(key, formData[key]);
      }
    }

    if (isEditing) {
      await axios.put(`/api/packages/${selectedPackageId}`, data);
    } else {
      await axios.post("/api/packages", data);
    }
    fetchPackages();
    closeModal();
  };

  const deletePackage = async (id) => {
    if (confirm("确定要删除这个路线吗？")) {
      await axios.delete(`/api/packages/${id}`);
      fetchPackages();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">管理旅游路线</h1>
      <button
        onClick={() => openModal()}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        添加新路线
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg._id} className="border rounded-xl p-4 shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-2">{pkg.packageName}</h2>
            <p>{pkg.packageDescription}</p>
            <p className="mt-2 text-sm text-gray-500">目的地：{pkg.packageDestination}</p>
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => openModal(pkg)}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                修改
              </button>
              <button
                onClick={() => deletePackage(pkg._id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                删除
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                    {isEditing ? "修改路线" : "添加新路线"}
                  </Dialog.Title>

                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries({
                      packageName: "名称",
                      packageDescription: "描述",
                      packageDestination: "目的地",
                      packageDays: "天数",
                      packageNights: "夜数",
                      packageAccommodation: "住宿",
                      packageTransportation: "交通",
                      packageGear: "装备",
                      packageActivities: "活动",
                      packagePrice: "原价",
                      packageDiscountPrice: "折扣价",
                    }).map(([key, label]) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700">{label}</label>
                        <input
                          type={typeof formData[key] === "number" ? "number" : "text"}
                          name={key}
                          value={formData[key]}
                          onChange={handleChange}
                          className="mt-1 w-full rounded border border-gray-300 p-2"
                          required
                        />
                      </div>
                    ))}

                    <div className="col-span-1 flex items-center gap-2">
                      <label className="text-sm">是否优惠：</label>
                      <input
                        type="checkbox"
                        name="packageOffer"
                        checked={formData.packageOffer}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700">上传图片</label>
                      <input
                        type="file"
                        name="packageImages"
                        multiple
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>

                    <div className="col-span-full flex justify-end gap-3 mt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
                      >
                        取消
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                      >
                        {isEditing ? "更新路线" : "添加路线"}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ManagePackage;