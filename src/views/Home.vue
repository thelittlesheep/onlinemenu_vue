<template>
  <div class="home">
    <h3>關於本系統</h3>
    這是一項基於 Vue3 + TypeScript + Vite 所搭建之線上點餐系統，其中包含了：
    <ol>
      <li>
        會員系統
        <ul>
          <li>新增會員</li>
          <li>會員登入</li>
          <li>修改會員資料</li>
        </ul>
      </li>
      <li>
        訂餐系統
        <ul>
          <li>新增訂單</li>
          <li>查詢訂單</li>
          <li>刪除訂單</li>
        </ul>
      </li>
      <li>全站RWD實作</li>
    </ol>
    <div>
      <h3 style="color: black">
        <span> 測試帳號 : meimei123 </span><br />
        <span> 測試密碼 : m987654321 </span>
      </h3>
    </div>
    <span
      >前端原始碼，請參考：
      <a href="https://github.com/thelittlesheep/onlinemenu_vue"
        >https://github.com/thelittlesheep/onlinemenu_vue</a
      > </span
    ><br />
    <span
      >後端API原始碼，請參考：<a
        href="https://github.com/thelittlesheep/onlinemenu_nestjs"
        >https://github.com/thelittlesheep/onlinemenu_nestjs</a
      ></span
    >
  </div>
</template>

<script lang="ts">
export default {
  name: 'Home'
};
</script>

<style></style>
