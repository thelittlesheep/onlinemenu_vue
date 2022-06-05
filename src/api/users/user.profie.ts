import { userDTO } from '@/interface/userDTO';
import { AxiosResponse } from 'axios';
import { request } from '../request';

async function updateUserProfile(userInfo: userDTO) {
  return request.put<AxiosResponse>({
    url: `/users/${userInfo.user_id}`,
    data: userInfo,
    showLoading: true,
    interceptors: {
      requestSuccessInterceptor(config) {
        return config;
      }
    },
    withCredentials: true
  });
}

export { updateUserProfile };
