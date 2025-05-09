import React from 'react';
import ChatIcon from "./ChatIcon";
import contactimg from "../assets/images/front.jpg";
const Contact = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="w-full -mb-24  py-28">
      {/* Hero Section */}
      <div className="relative h-96 -mt-28 overflow-hidden">
        <img src={contactimg} alt="About Us Hero" className="w-full opacity-60 h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-600 uppercase border-b-4 p-2">徒步地图</h1>
        </div>
      </div>
      <div className="container    bg-white">
        <section className="container mx-auto px-12  py-16 ">
          <div className="text-center mb-10">
            <h2 className="text-orange-500 font-semibold uppercase">徒步地图</h2>
            <h1 className="text-4xl font-bold mt-2">
              <span className="text-orange-500">选择</span> 你想去的地方
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d32631705.126212098!2d85.99999999999999!3d35.86166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35f05296d960dffb%3A0xe0b4cf2bdbdd86!2z5Lit5Zu9!5e0!3m2!1szh-CN!2scn!4v1715158913704!5m2!1szh-CN!2scn"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg shadow-md"
              ></iframe>
            </div>
            <div className="w-full md:w-1/2">
              <div className="bg-transparent p-6 rounded-lg shadow-2xl">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="省"
                      className="w-full px-4 py-2 border border-orange-400 border-solid rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <input
                      type="email"
                      placeholder="市"
                      className="w-full px-4 py-2 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="具体地址"
                    className="w-full px-4 py-2 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <textarea
                    placeholder="其他信息"
                    rows="5"
                    className="w-full px-4 py-2 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300 ease-in-out"
                  >
                    查询
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <ChatIcon />
      </div>
    </div>
  );
};

export default Contact;