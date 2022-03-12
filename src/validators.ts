import { required } from "@vee-validate/rules";
import { defineRule } from "vee-validate";

defineRule("pwdconfirm", (value: string, target: string, ctx) => {
  if (!value) return "請再次輸入密碼";
  if (value != ctx.form[target]) return "密碼不相符，請再次確認";
  return true;
});

defineRule("required", (value: string) => {
  if (!value || !value.length) {
    return "此欄位必須填寫!";
  }
  return true;
});

defineRule("useraccount", (value: string, ctx: any) => {
  if (!value) return "請輸入使用者名稱";
  if (!/^[a-zA-Z]\w{5,9}$/.test(value))
    return "開頭必需為英文字母，且需為6-9位元";
  return true;
});

defineRule("userpassword", (value: string) => {
  if (!value) return "請輸入密碼";
  if (!/^\w{6,24}$/.test(value)) return "密碼是6-24個字符";
  return true;
});
