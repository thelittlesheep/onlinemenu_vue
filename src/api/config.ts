// 配置請求超時時間，
// 根據不同環境來改變baseUrl

let BASE_URL = "";
const TIME_OUT = 5000;

if (process.env.NODE_ENV === "development") {
  BASE_URL = `${import.meta.env.VITE_BACKEND_HOST}`;
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = `${import.meta.env.VITE_BACKEND_HOST}`;
} else {
  BASE_URL = "test";
}

export { BASE_URL, TIME_OUT };
