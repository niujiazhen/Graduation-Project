import React, { useEffect } from 'react';
import { useSpring, animated, config } from 'react-spring';
import image7 from "../assets/images/images.jpg";
import image8 from "../assets/images/image8.jpeg";
import image9 from "../assets/images/images9.jpeg";
import image10 from "../assets/images/images10.jpeg";
import aboutimg from "../assets/images/baground.jpg";
import { FaFacebookF, FaTwitter, FaInstagram, FaExternalLinkAlt } from "react-icons/fa";
import ChatIcon from "./ChatIcon";

const About = () => {
  const [springs, api] = useSpring(() => ({
    from: { scale: 0, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    config: config.molasses,
  }));

  useEffect(() => {
    api.start({ scale: 1, opacity: 1 });
  }, [api]);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img src={aboutimg} alt="About Us Hero" className="w-full h-full opacity-60 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-600 uppercase border-b-4 p-2">About Us</h1>
        </div>
      </div>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 hi"> 
        <section className="bg-white rounded-xl shadow-lg py-12 pl-20 px-8 mb-12">
          <h2 className="text-orange-500 font-semibold mb-2">关于我们</h2>
          <h1 className="text-4xl font-bold mb-6">
            欢迎来到 <span className="text-orange-500">TRIPLO</span>
          </h1>
          
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <p className="text-gray-600 mb-8 leading-relaxed">
              欢迎来到我们的徒步旅游平台Triplo！我们致力于为<b>徒步爱好者</b>提供全面、精准的信息，包括<b>徒步线路、装备建议、训练计划、实时天气预报和健康管理</b>等。无论是初学者还是资深旅行者，都能在这里找到适合自己的旅行方案。我们倡导环保和可持续的旅游理念，鼓励旅行者亲近自然，增强环保意识。加入我们，开启一段健康、绿色的徒步之旅，探索中国壮丽的自然风光！
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[
                  { icon: <i className="fas fa-hotel text-orange-500 text-3xl mb-2"></i>, number: '126', label: '地区' },
                  { icon: <i className="fas fa-star text-orange-500 text-3xl mb-2"></i>, number: '486', label: '评论' },
                  { icon: <i className="fas fa-users text-orange-500 text-3xl mb-2"></i>, number: '836', label: '用户' }
                ].map((item, index) => (
                  <div 
                    key={item.label}
                    className="border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    {item.icon}
                    <h3 className="text-2xl font-bold">{item.number}</h3>
                    <p className="text-gray-600">{item.label}</p>
                  </div>
                ))}
              </div>
              
              <button 
                className="bg-orange-500 text-white py-3 px-8 rounded-full hover:bg-orange-600 transition duration-300 shadow-md hover:shadow-lg text-lg font-semibold"
              >
                探索更多
              </button>
            </div>
            
            <div className="lg:w-1/2 ">
              <div className="grid grid-cols-2 gap-4">
                <animated.div style={springs} className="w-48 h-48 ml-32 mt-24 mb-3 overflow-hidden">
                  <img 
                    src={image7} 
                    alt="Travel image 1" 
                    className="w-full h-full object-cover rounded-sm border-2 border-orange-600 drop-shadow-xl"
                  />
                </animated.div>
                <animated.div style={springs} className="w-72 h-72 mb-3 overflow-hidden">
                  <img 
                    src={image8} 
                    alt="Travel image 2" 
                    className="w-full h-full object-cover rounded-sm border-2 border-orange-600 drop-shadow-xl"
                  />
                </animated.div>
                <animated.div style={springs} className="w-32 h-32 ml-48 overflow-hidden">
                  <img 
                    src={image9} 
                    alt="Travel image 3" 
                    className="w-full h-full object-cover rounded-sm border-2 border-orange-600 drop-shadow-xl"
                  />
                </animated.div>
                <animated.div style={springs} className="w-48 h-48 overflow-hidden">
                  <img 
                    src={image10} 
                    alt="Travel image 4" 
                    className="w-full h-full object-cover rounded-sm border-2 border-orange-600 drop-shadow-xl"
                  />
                </animated.div>
              </div>
            </div>
          </div>
        </section>
        <ChatIcon />
      </div>
    </div>
  );
};

export default About;
