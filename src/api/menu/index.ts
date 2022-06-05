import { orderDTO } from '@/interface/orderDTO';
import { AxiosResponse } from 'axios';
import { Ref } from 'vue';
import { IRequestData, request } from '../request';

export async function getMenuData(): Promise<IRequestData> {
  return request
    .get<IRequestData>({
      url: '/menu/products',

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
export async function postMenuCartData(
  user_id: number,
  payload: Ref<orderDTO>
) {
  return request.post<AxiosResponse>({
    url: `/users/${user_id}/orders`,
    data: payload.value,
    interceptors: {
      requestSuccessInterceptor(config) {
        return config;
      }
    },
    withCredentials: true
  });
}
