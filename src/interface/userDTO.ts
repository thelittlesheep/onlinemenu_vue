import { orderDTO } from "@/interface/orderDTO";

export interface userDTO {
  user_id: number;

  user_account: string;

  user_password: string;

  user_name: string;

  user_phone: string;

  user_age: number;

  orders?: orderDTO[];
}
