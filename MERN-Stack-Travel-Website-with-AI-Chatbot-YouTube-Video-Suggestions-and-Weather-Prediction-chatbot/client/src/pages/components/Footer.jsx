import React, { useState } from "react";
import { FaTwitter, FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa";
import ScrollAnimationComponent from "../ScrollAnimationComponent";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <div className="mt-auto">
      <ScrollAnimationComponent>
        <div className="bg-white py-8 sm:py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
              订阅以获得 <span className="text-orange-500">后续更新</span>
            </h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="输入邮箱"
                className="flex-grow p-2 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none mb-2 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:bg-orange-600 transition duration-300"
              >
                订阅
              </button>
            </form>
          </div>
        </div>

        <footer className="bg-gray-900 text-white py-8 sm:py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mx-4 sm:mx-8 lg:mx-16">
              <div className="mb-8 lg:mb-0 bg-amber-500 rounded-md py-3 px-3">
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4 mx-3 sm:mx-5">
                  TRIPLO
                </h3>
                <p className="text-base sm:text-lg mx-3 sm:mx-5">
                  <span className="text-gray-900">Triplo</span>为徒步爱好者提供全面的信息，包括线路、装备、训练计划、天气预报和健康管理等。无论你是新手还是资深旅行者，都能找到适合的方案。加入我们，开启健康、绿色的徒步之旅，探索中国的自然美景！
                </p>
              </div>
              <div className="ml-0 sm:ml-4 lg:ml-10">
                <h4 className="font-semibold mb-4 text-xl text-orange-500 cursor-pointer hover:underline">联系我们  </h4> 
                <ul className="space-y-2">
                  <li>北京市海淀区清华东路35号北京林业大学</li>
                  <li>+86 18221567185</li>
                  <li>niujiazhen26@163.com</li>
                  <li className="flex space-x-4 mt-4">
                    <FaTwitter className="text-xl hover:text-orange-500 cursor-pointer" />
                    <FaFacebook className="text-xl hover:text-orange-500 cursor-pointer" />
                    <FaYoutube className="text-xl hover:text-orange-500 cursor-pointer" />
                    <FaLinkedin className="text-xl hover:text-orange-500 cursor-pointer" />
                  </li>
                </ul>
              </div>
              <div>
                <h4 className=" font-semibold mb-4 text-xl text-orange-500 cursor-pointer hover:underline">企业 <span className="w-16 mx-2  h-[2px] bg-orange-500 "></span> </h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-orange-500">关于我们</a></li>
                  <li><a href="#" className="hover:text-orange-500">徒步地图</a></li>
                  <li><a href="#" className="hover:text-orange-500">生态环保</a></li>
                  <li><a href="#" className="hover:text-orange-500">条款</a></li>
                  <li><a href="#" className="hover:text-orange-500">支持</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-xl text-orange-500 cursor-pointer hover:underline">服务</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-orange-500">目的地信息</a></li>
                  <li><a href="#" className="hover:text-orange-500">景点推荐</a></li>
                  <li><a href="#" className="hover:text-orange-500">徒步计划</a></li>
                  <li><a href="#" className="hover:text-orange-500">酒店预订</a></li>
                  <li><a href="#" className="hover:text-orange-500">徒步装备</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 sm:mt-12 border-t border-gray-800 pt-6 sm:pt-8">
            <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
              <p className="text-sm text-gray-400 mb-4 sm:mb-0">
                © Niujiazhen, All Right Reserved
              </p>
              <ul className="flex flex-wrap justify-center sm:justify-end space-x-4">
                <li><a href="#" className="text-sm text-gray-400 hover:text-orange-500">首页</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-orange-500">Cookies</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-orange-500">帮助</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-orange-500">FAQs</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </ScrollAnimationComponent>
    </div>
  );
};

export default Footer;