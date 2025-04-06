import React, { useState } from "react";
import "./styles/Home.css";
import { useNavigate } from "react-router";
import homeVideo from "../assets/vedios/home.mp4";
import ChatIcon from "./ChatIcon";
import gokarnaImage from "../assets/images/Gokarna.jpg";
import coorgImage from "../assets/images/coorg.jpeg";
import AgumbeImage from "../assets/images/Agumbe.jpg";
import { Link } from "react-router-dom";
import { useSpring, animated } from 'react-spring';
import WeatherSearch from "./components/WeatherSearch";

const Home = () => {
  const navigate = useNavigate();
  const [topPackages, setTopPackages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const springs = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { duration: 1000 },
  });

  const destinations = [
    {
      name: "四川四姑娘山",
      season: "秋",
      description:
        '四姑娘山位于四川省，是徒步和登山爱好者的天堂。这里的四座雪山、广袤的原始森林和丰富的动植物资源使其成为理想的徒步旅行地。',
      image: coorgImage,
    },
    {
      name: "张家界",
      season: "夏",
      description:
        "张家界以其独特的石柱山景观而闻名，是中国最具特色的徒步旅行目的地之一。这里的山脉、峡谷、溶洞和森林覆盖度高，适合进行多日的徒步探险。",
      image: AgumbeImage,
    },
    {
      name: "黄山",
      season: "春",
      description:
        "黄山是中国最著名的山脉之一，以其奇松、怪石、云海和温泉闻名。黄山的徒步线路非常丰富，适合各种水平的旅行者。",
      image: gokarnaImage,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % destinations.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + destinations.length) % destinations.length
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="w-full h-screen relative">
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover absolute"
          >
            <source src={homeVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4 ">
            <div className="text-white font-bold flex items-center mb-4 text-sm md:text-base pt-16 ">
              <span className="w-8 md:w-16 mx-2 h-[2px] bg-orange-500"></span>
              欢迎来到中国徒步旅游网站TRIPLO
              <span className="w-8 md:w-16 mx-2 h-[2px] bg-orange-500"></span>
            </div>
            <h1 className="text-white text-xl md:text-4xl text-center font-bold mb-4">
            立即获取最新天气动态！
            </h1>
            <WeatherSearch />
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 ">
          <div className="my-12 bg-white p-4 md:p-8 rounded-lg shadow-md relative">
            <h2 className="text-2xl pl-5 md:text-5xl font-bold mb-4 absolute top-36">
              欢迎来到 <span className="text-orange-500">TRIPLO</span>
            </h2> 
            <div className="flex flex-col lg:flex-row-reverse ">
              <div className="lg:w-1/2 mb-8 lg:mb-0 lg:mr-8 ">
                <div className="grid grid-cols-2 gap-4 ">
                  <animated.div style={springs} className="w-48 h-48 ml-36 mt-24 mb-3 overflow-hidden">
                    <img
                      src={coorgImage}
                      alt="Travel image 1"
                      className="w-full h-full object-cover rounded-sm border-2 border-orange-600 drop-shadow-xl"
                    />
                  </animated.div>
                  <animated.div style={springs} className="w-72 h-72 mb-3 overflow-hidden">
                    <img
                      src={AgumbeImage}
                      alt="Travel image 2"
                      className="w-full h-full object-cover rounded-sm border-2 border-orange-600 drop-shadow-xl"
                    />
                  </animated.div>
                  <animated.div style={springs} className="w-32 h-32  ml-52 overflow-hidden">
                    <img
                      src={gokarnaImage}
                      alt="Travel image 3"
                      className="w-full h-full object-cover rounded-sm border-2 border-orange-600 drop-shadow-xl"
                    />
                  </animated.div>
                  <animated.div style={springs} className="w-48 h-48 overflow-hidden">
                    <img
                      src={coorgImage}
                      alt="Travel image 4"
                      className="w-full h-full object-cover rounded-sm border-2 border-orange-600 drop-shadow-xl"
                    />
                  </animated.div>
                </div>
              </div>
              <div className="lg:w-1/2 pt-44">
                <p className="text-gray-600 mb-8  text-2xl px-4 leading-relaxed">
                欢迎来到我们的徒步旅游平台Triplo！我们致力于为<b>徒步爱好者</b>提供全面、精准的信息，包括<b>徒步线路、装备建议、训练计划、实时天气预报和健康管理</b>等。无论是初学者还是资深旅行者，都能在这里找到适合自己的旅行方案。我们倡导环保和可持续的旅游理念，鼓励旅行者亲近自然，增强环保意识。加入我们，开启一段健康、绿色的徒步之旅，探索中国壮丽的自然风光！
                </p>
                <button className="bg-orange-500 ml-4 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition duration-300">
                  <Link to="/about">关于我们</Link>
                </button>
              </div>
            </div>
          </div>

          <div className="my-12">
            <h3 className="text-center text-orange-500 font-semibold mb-2">
              徒步旅游推荐
            </h3>
            <h2 className="text-center text-2xl md:text-4xl font-bold mb-8">
              探索 <span className="text-orange-500">以下地区</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {destinations.map((place, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={place.image}
                    alt={place.name}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-4">
                    <span className="inline-block bg-orange-500 text-white px-2 py-1 rounded-full text-sm mb-2">
                      {place.season}
                    </span>
                    <h3 className="text-xl font-semibold mb-2">{place.name}</h3>
                    <p className="text-gray-600 mb-4">{place.description}</p>
                    <button className="text-orange-500 font-semibold hover:underline">
                      查看详情
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 text-white py-8 md:py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                热门徒步旅游推荐
              </h2>
              <div className="relative overflow-hidden mx-auto w-full md:w-3/4">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {destinations.map((dest, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <div className="bg-white text-black p-4 md:p-6 rounded-lg shadow-lg mx-2 md:mx-4">
                        <h3 className="text-lg md:text-xl font-semibold mb-2">
                          {dest.name}
                        </h3>
                        <p className="text-gray-600 mb-2">{dest.season}</p>
                        <p className="text-sm md:text-base">
                          {dest.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={prevSlide}
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full"
                >
                  &lt;
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>

        <ChatIcon />
      </div>
    </div>
  );
};

export default Home;
