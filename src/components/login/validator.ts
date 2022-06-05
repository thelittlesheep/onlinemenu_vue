import { FormInstance } from 'element-plus';
import { reactive, Ref, ref } from 'vue';

type formType = {
  account: string;
  password: string;
  passwordconfirm: string;
};

export class loginForm {
  formVal: formType;
  formRef: any;
  constructor() {
    this.formVal = reactive({
      account: '',
      password: '',
      passwordconfirm: ''
    });
    this.formRef = ref() as Ref<FormInstance>;
  }

  validateAccount = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('請輸入使用者名稱'));
    } else {
      if (!/^[a-zA-Z]\w{5,8}$/.test(value)) {
        callback(new Error('開頭必需為英文字母，且需為6-9位元'));
      }
    }
    callback();
  };

  validatePassword = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('請輸入密碼'));
    } else {
      if (!/^\w{6,24}$/.test(value)) {
        callback(new Error('密碼是6-24個字符'));
      }
      if (this.formVal.passwordconfirm !== '') {
        if (!this.formRef.value) return;
        this.formRef.value.validateField('passwordconfirm', () => null);
        callback();
      }
      callback();
    }
  };

  validatePasswordconfirm = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('請再次輸入密碼'));
    } else if (value !== this.formVal.password) {
      callback(new Error('密碼不相符，請再次確認'));
    } else {
      callback();
    }
  };
}
