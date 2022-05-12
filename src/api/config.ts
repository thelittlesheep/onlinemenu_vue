// 配置請求超時時間，
// 根據不同環境來改變baseUrl

let BASE_URL = "";
const TIME_OUT = 5000;

// const dev_remote_url = import.meta.env.VITE_BACKEND_DEV_REMOTE_HOST;
// const dev_url = import.meta.env.VITE_BACKEND_DEV_HOST as string;
// const url = dev_url;

if (process.env.NODE_ENV === "development") {
  BASE_URL = `${import.meta.env.VITE_BACKEND_HOST}`;
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = `${import.meta.env.VITE_BACKEND_HOST}`;
} else {
  BASE_URL = "test";
}

export { BASE_URL, TIME_OUT };
