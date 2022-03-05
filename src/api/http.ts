import axios, { AxiosError, AxiosResponse } from "axios"; // 參考axios

// const instance = axios.create({
//   baseURL: config.baseUrl.dev,
//   timeout: 60000,
// });

export async function asyncget(
  url: string
): Promise<AxiosResponse | AxiosError> {
  try {
    const response: AxiosResponse = await axios.get(url);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errmsg = "CROS Error" + error.code;
      throw new Error(errmsg);
    } else {
      throw new Error("Unknow Error");
    }
  }
}

const showStatus = (status: number) => {
  let message = "";
  switch (status) {
    case 400:
      message = "請求錯誤(400)";
      break;
    case 401:
      message = "未授權，請重新登錄(401)";
      break;
    case 403:
      message = "拒絕訪問(403)";
      break;
    case 404:
      message = "請求出錯(404)";
      break;
    case 408:
      message = "請求超時(408)";
      break;
    case 500:
      message = "伺服器錯誤(500)";
      break;
    case 501:
      message = "服務未實現(501)";
      break;
    case 502:
      message = "網絡錯誤(502)";
      break;
    case 503:
      message = "服務不可用(503)";
      break;
    case 504:
      message = "網絡超時(504)";
      break;
    case 505:
      message = "HTTP版本不受支持(505)";
      break;
    default:
      message = `連接出錯(${status})!`;
  }
  return `${message}，請檢查網絡或聯系管理員！`;
};
