import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("API_KEY 未定义或为空");
  throw new Error("Gemini API 密钥未找到。请在 .env 文件中设置 VITE_GEMINI_API_KEY。");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const generationConfig = {
  temperature: 0.7,
  topP: 1,
  topK: 40,
  maxOutputTokens: 1000,
};

let chat;
let chatHistory = [];

// 🥾 徒步旅游主题 Prompt 列表
const hikingPrompts = [
  {
    type: "general",
    prompt: `请为在 {destination} 进行徒步旅行提供一个详细指南，考虑以下情况：
    1. 简要描述该地徒步旅行的特色（2-3句）
    2. 推荐3-5条适合当前气温（{temperature}）和天气状况（{weather_conditions}）的徒步路线,徒步路线要具体一些，具体到路名，公里数，地形，海拔，沿途露营地点和时间
    3. 徒步过程中需要特别注意的事项
    4. 推荐必备装备清单，具体一些
    5. 一个关于当地徒步文化或环保的小贴士`  
  },
  {
    type: "gear",
    prompt: `针对在 {destination} 徒步旅行，气温约为 {temperature}，天气状况为 {weather_conditions}，推荐适合的装备。包括：
    1. 服装（上衣、裤子、鞋子）
    2. 必需的配件（帽子、防晒用品、登山杖等）
    3. 必备应急物品
    4. 小贴士：如何根据气候变化灵活调整装备`
  },
  {
    type: "safety",
    prompt: `针对在 {destination} 徒步旅行（气温 {temperature}，天气 {weather_conditions}），请提供一份安全指南，涵盖：
    1. 常见风险及预防措施
    2. 迷路时的应对策略
    3. 突发天气变化时的处理建议
    4. 求救或寻求帮助的渠道`
  },
  {
    type: "itinerary",
    prompt: `根据气温 {temperature} 和天气状况 {weather_conditions}，请为 {destination} 制定一条为期一天的徒步旅行行程。包括：
    1. 起点与终点
    2. 推荐中途休息点
    3. 午餐或补给建议
    4. 风景亮点和拍照打卡地
    5. 时间安排建议`
  },
  {
    type: "tips",
    prompt: `给出一些在 {destination} 徒步旅行的小贴士，适应气温 {temperature} 和天气状况 {weather_conditions}。包括：
    1. 体力分配技巧
    2. 饮水与能量补充建议
    3. 与野生动植物安全相处的方法
    4. 环保徒步小建议`
  }
];

// 🛠️ 创建 Prompt
const createPrompt = (userInput) => {
  let selectedPrompt = hikingPrompts.find(p => userInput.toLowerCase().includes(p.type)) || hikingPrompts[0];
  let filledPrompt = selectedPrompt.prompt;

  // 这里的默认值可以根据你的需要进一步细化
  filledPrompt = filledPrompt.replace(/{destination}/g, "目的地");
  filledPrompt = filledPrompt.replace(/{temperature}/g, "当前气温");
  filledPrompt = filledPrompt.replace(/{weather_conditions}/g, "当前天气状况");

  return `你是 Triplo，一个徒步旅游专家。根据以下查询和对话历史提供专业且富有吸引力的回复：“${userInput}”。

${filledPrompt}

如果查询与选定的提示不完全匹配，请根据用户的问题调整回答，同时结合实用的徒步旅行建议。保持回答友好、详细且充满探索感。建议控制在 250-300 字左右。`;
};

// 判断是否为打招呼
const isGreeting = (input) => {
  const greetings = ['嗨', '你好', '嘿', '问候', '你好呀'];
  return greetings.some(greeting => input.toLowerCase().includes(greeting));
};

// 初始化聊天
export const initializeChat = () => {
  chat = model.startChat({
    generationConfig,
    history: [],
  });
  chatHistory = [];
};

// 发送消息
export const sendMessage = async (userInput) => {
  if (!chat) {
    initializeChat();
  }

  if (isGreeting(userInput)) {
    const greeting = "你好！我是 Triplo，一名徒步旅行专家！需要帮你规划徒步路线吗？🏞️";
    chatHistory.push({ role: "model", parts: greeting });
    return greeting;
  }

  const prompt = createPrompt(userInput);
  chatHistory.push({ role: "user", parts: userInput });

  try {
    const result = await chat.sendMessage(prompt);
    const response = result.response.text().trim();
    chatHistory.push({ role: "model", parts: response });

    // 限制聊天历史记录为最后 10 条
    if (chatHistory.length > 10) {
      chatHistory = chatHistory.slice(-10);
    }

    return response;
  } catch (error) {
    console.error('发送消息时出错:', error);
    return "抱歉，处理您的请求时出现了错误。请稍后再试。";
  }
};

// 获取聊天历史
export const getChatHistory = () => {
  return chatHistory;
};
