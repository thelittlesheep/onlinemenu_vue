import { AxiosResponse } from 'axios';
import { request } from '../request';

async function getSingleOrder(user_id: number, order_id: number) {
  return request
    .get<AxiosResponse>({
      url: `/users/${user_id}/orders/${order_id}`,
      showLoading: false,
      interceptors: {
        requestSuccessInterceptor(config) {
          return config;
        }
      },
      withCredentials: true
    })
    .then((res) => {
      return res;
    });
}

export { getSingleOrder };
