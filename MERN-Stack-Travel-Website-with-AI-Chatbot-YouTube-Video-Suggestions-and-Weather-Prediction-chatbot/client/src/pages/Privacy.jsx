import React from 'react';
import contactimg from "../assets/images/Agumbe.jpg";

const Ecology = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 顶部图片 */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={contactimg}
          alt="Ecology Hero"
          className="w-full opacity-60 h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-5xl font-bold text-green-500 uppercase border-b-4 border-green-600 p-2">徒步生态</h1>

        </div>
      </div>

      {/* 正文区域 */}
      <div className="flex-grow w-full py-12 px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-green-700">生态与徒步的融合</h2>
          <p className="mb-6 text-gray-700 leading-relaxed">
            徒步旅行是一种将运动、自然和环保结合在一起的活动方式。在穿越山川湖海的过程中，徒步者不仅可以欣赏壮丽风景，也有机会亲身体验生态系统的多样性。通过科学规划路线和注重环保行为，徒步成为唤起公众对自然保护意识的重要渠道。
            想了解生态环保组织的工作，请访问
            <a
              href="https://www.wwfchina.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline ml-1"
            >
              世界自然基金会（WWF）官网
            </a>。
          </p>
          <img
            src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1950&q=80"
            alt="野生动物"
            className="max-w-2xl w-full mx-auto rounded-2xl shadow mb-6"

          />

          <h3 className="text-2xl font-semibold text-green-800 mb-2">沿途植物资源</h3>
          <p className="mb-6 text-gray-700 leading-relaxed">
            中国西部和高原地带拥有丰富的植物资源，包括杜鹃花、冷杉、青冈栎等。这些植物不仅装点了徒步路线，也是当地生态系统的重要组成部分。不同季节，沿途的植物会展现出完全不同的生态景观，成为徒步爱好者拍照和观察的热门主题。
            更多植物种类信息，请参考
            <a
              href="https://www.cfh.ac.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="max-w-2xl w-full mx-auto rounded-2xl shadow mb-6"

            >
              中国植物图像库
            </a>。
          </p>

          {/* 野生动物 */}
          <h3 className="text-2xl font-semibold text-green-800 mb-2">野生动物保护</h3>
          <p className="mb-6 text-gray-700 leading-relaxed">
            在生态丰富的地区进行徒步时，常能遇见多种野生动物，如藏羚羊、金丝猴、斑羚等国家一级保护动物。保持距离、不干扰它们的生活习性，是徒步者应当遵守的基本准则。某些路线甚至会在特定季节限制通行，以保护野生动物的繁衍期。
            推荐阅读
            <a
              href="https://www.shanshui.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="max-w-2xl w-full mx-auto rounded-2xl shadow mb-6"

            >
              山水自然保护中心
            </a> 的研究成果。
          </p>

          {/* 徒步路线 */}
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1950&q=80"
            alt="生态徒步路线"
            className="w-full rounded-2xl shadow mb-6"
          />
          <h3 className="text-2xl font-semibold text-green-800 mb-2">典型生态徒步路线</h3>
          <p className="mb-6 text-gray-700 leading-relaxed">
            中国有许多生态优质的徒步路线，例如稻城亚丁的雪山草甸、川藏线上原始森林与冰川、云南梅里雪山的高山湖泊等。这些路线穿越多个自然保护区，沿途风景壮观、生态系统复杂，是进行生态观察和户外科普的绝佳场所。
            路线规划可参考
            <a
              href="https://www.mafengwo.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline ml-1"
            >
              马蜂窝徒步指南
            </a>。
          </p>

          {/* 可持续发展 */}
          <img
            src="https://images.unsplash.com/photo-1483794344563-d27a8d18014e?auto=format&fit=crop&w=1950&q=80"
            alt="生态保护"
            className="w-full rounded-2xl shadow mb-6"
          />
          <h3 className="text-2xl font-semibold text-green-800 mb-2">生态保护与可持续发展</h3>
          <p className="mb-6 text-gray-700 leading-relaxed">
            徒步活动应贯彻“无痕山林”（Leave No Trace）原则，包括不乱扔垃圾、不破坏植物、不惊扰动物等。越来越多的徒步者开始携带可降解垃圾袋、使用可重复利用的水瓶，并参与沿途垃圾清理等志愿活动，成为推动生态保护的积极力量。
            想了解如何成为负责任的户外旅行者，请访问
            <a
              href="https://www.leavenotrace.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline ml-1"
            >
              Leave No Trace 官方网站
            </a>。
          </p>
        </div>
      </div>
    </div>
  );
};

export default Ecology;
