import { orderDTO } from "@/interface/orderDTO";

export interface userDTO extends userBasicDTO {
  user_id: number;

  user_name: string;

  user_phone: string;

  user_age: number;

  orders?: orderDTO[];
}

export interface userBasicDTO {
  user_account: string;

  user_password: string;
}

// export class user implements userDTO {
//   constructor(
//     public user_id: number,
//     public user_account: string,
//     public user_password: string,
//     public user_name: string,
//     public user_phone: string,
//     public user_age: number,
//     public orders?: orderDTO[]
//   ) {}
// }
