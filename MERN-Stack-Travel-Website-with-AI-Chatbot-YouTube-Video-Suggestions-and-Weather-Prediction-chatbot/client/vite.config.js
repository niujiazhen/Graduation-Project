import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      port: 5173, // 前端运行端口
      proxy: {
        "/api": {
          target: "http://localhost:8000", // 代理到本地的后端接口
          secure: false,
          changeOrigin: true, // 解决跨域问题
        },
      },
    },
    plugins: [react()],
    define: {
      'process.env': process.env
    }
  };
});