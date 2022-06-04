import { defineRule } from 'vee-validate';

defineRule('pwdconfirm', (value: string, target: string, ctx) => {
  if (!value) return '請再次輸入密碼';
  if (value != ctx.form[target]) return '密碼不相符，請再次確認';
  return true;
});

defineRule('required', (value: string) => {
  if (!value || !value.length) {
    return '此欄位必須填寫!';
  }
  return true;
});

defineRule('useraccount', (value: string, ctx: any) => {
  if (!value) return '請輸入使用者名稱';
  if (!/^[a-zA-Z]\w{5,9}$/.test(value))
    return '開頭必需為英文字母，且需為6-9位元';
  return true;
});

defineRule('userpassword', (value: string) => {
  if (!value) return '請輸入密碼';
  if (!/^\w{6,24}$/.test(value)) return '密碼是6-24個字符';
  return true;
});

// const required = (value: string) => {
//   if (!value || !value.length) {
//     return "此欄位必須填寫!";
//   }

//   return true;
// };
// // 定義表單-用戶名驗證規則
// const useraccount = (value: string) => {
//   // value是將來使用該規則的表單元素的值
//   // 1. 必填
//   // 2. 6-20個字符，需要以字母開頭
//   // 如何反饋校驗成功還是失敗，返回true才是成功，其他情況失敗，返回失敗原因。
//   if (!value) return "請輸入使用者名稱";
//   if (!/^[a-zA-Z]\w{5,9}$/.test(value))
//     return "開頭必需為英文字母，且需為6-9位元";
//   return true;
// };

// // 密碼驗證規則
// const userpassword = (value: string) => {
//   if (!value) return "請輸入密碼";
//   if (!/^\w{6,24}$/.test(value)) return "密碼是6-24個字符";
//   return true;
// };

// const pwdconfirm = (value: string, target: string) => {
//   if (!value) return "請再次輸入密碼";
//   // if (value != target) return "密碼不相符，請再次確認";
//   return true;
// };

// export const valSchema = {
//   required,
//   useraccount,
//   userpassword,
//   pwdconfirm,
// };

// const name = (value: string) => {
//   if (!value) return "請輸入名字";
//   return true;
// };

// const mail = (val: string) => {
//   const re =
//     //eslint-disable-next-line
//     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   if (!re.test(val)) return "請輸入正確電子郵件";
//   return true;
// };

// const phone = (value: string) => {
//   if (!value) return "請輸入電話";
//   return true;
// };

// const age = (val: string) => {
//   if (!/^\d+$/.test(val)) {
//     return "請輸入正確年齡";
//   }

//   return true;
// };
