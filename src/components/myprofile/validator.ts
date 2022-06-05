import { FormInstance } from 'element-plus';
import { reactive, Ref, ref } from 'vue';
import { userDTO } from '../../interface/userDTO';
import validator from 'validator';

type formType = {
  user_name: string;
  user_phone: string;
  user_email: string;
};

export class userInfoForm {
  formVal: userDTO;
  formRef: any;
  constructor(user: userDTO) {
    this.formVal = reactive({
      user_account: user.user_account,
      user_password: user.user_password,
      user_id: user.user_id,
      user_name: user.user_name as string,
      user_phone: user.user_phone as string,
      user_email: user.user_email as string
    });
    this.formRef = ref() as Ref<FormInstance>;
  }
  validatePhone = (rule: any, value: any, callback: any) => {
    if (validator.isEmpty(value)) {
      callback(new Error('請輸入使用者電話'));
    } else {
      if (!/^09\d{8}$/.test(value)) {
        callback(new Error('錯誤的電話格式'));
      }
    }
    callback();
  };
  validateEmail = (rule: any, value: any, callback: any) => {
    if (validator.isEmpty(value)) {
      callback(new Error('請輸入使用者名稱'));
    } else {
      if (!validator.isEmail(value)) {
        callback(new Error('錯誤的信箱格式'));
      }
    }
    callback();
  };
}
