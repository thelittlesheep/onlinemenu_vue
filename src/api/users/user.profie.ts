import { userDTO } from "@/interface/userDTO";
import { request } from "../request";

async function updateUserProfile(userInfo: userDTO) {
  return request.put({
    url: `/users/${userInfo.user_id}`,
    data: userInfo,
    interceptors: {
      requestSuccessInterceptor(config) {
        return config;
      }
    },
    withCredentials: true
  });
}

export { updateUserProfile };
