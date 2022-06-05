<template>
  <div class="NavBar">
    <div class="el-menu">
      <el-menu
        class="my-el-menu"
        style="border-bottom: 0"
        :default-active="route.path"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        :ellipsis="true"
      >
        <el-menu-item
          v-for="item in tabItems"
          :key="item.path"
          :index="item.path"
        >
          {{ item.name }}
        </el-menu-item>
      </el-menu>
    </div>
    <div class="login-regiser-cart">
      <el-button
        v-if="!isLogin"
        type="text"
        @click="$router.push('/login')"
        ><span>登入/註冊</span></el-button
      >
      <div
        v-else
        class="hello-user"
      >
        <!-- <span>{{ userInfo.user_name }} &ensp;</span> -->
        <el-button
          type="text"
          @click="logout"
          ><span>登出</span></el-button
        >
      </div>
      <el-button
        class="opencartbutton"
        type="primary"
        @click="drawerVis = true"
      >
        <el-icon :size="18"><ShoppingBag /></el-icon>
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { mainStore } from '@/store/main.store';
import { storeToRefs } from 'pinia';
import { computed } from '@vue/reactivity';
import { userStore } from '@/store/user.store';
import { ShoppingBag } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'Navbar',
  components: { ShoppingBag },
  setup() {
    const route = useRoute();
    const router = useRouter();
    // const path = computed(() => route.path);
    const { isLogin, drawerVis } = storeToRefs(mainStore());
    const userstore = userStore();
    const { userInfo } = storeToRefs(userstore);
    // 直接在 :default-active 加上 route.fullPath 即可完成重新載入頁面後，
    // 仍保持 Navbar 之 menu-item 在正確的 tab 上啟用
    // 另一種監聽路由的方法
    // const activeIndex = ref();
    // watch(route, (val) => {
    //   activeIndex.value = val.fullPath;
    // });

    async function logout() {
      await userstore.logout();
      // 根據環境切換cookieDomain
      const cookieDomain =
        process.env.NODE_ENV === 'development'
          ? '192.168.0.197'
          : '.lshuang.tw';
      // 刪除 cookie，Domain=localhost 時，會刪除所有 localhost 的 cookie，反之則為刪除lshuang.tw之cookie。
      // 刪除 cookie之方法為將 cookie 的值設為空字串，並設置過期日期為過去的時間。
      document.cookie = `user_session=;Domain=${cookieDomain}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      router.go(0);
    }
    // 監視isLogin，如果變成已登入，就更新userInfo
    watch(isLogin, async (val) => {
      if (isLogin.value === true) {
        userInfo.value = await userstore.getUserInfo();
        console.log('NavBar');
      }
    });

    const tabItems = [
      {
        name: '菜單',
        path: '/menu'
      },
      {
        name: '我的訂單',
        path: '/myorder'
      },
      {
        name: '我的資料',
        path: '/myprofile'
      }
    ];

    // const handleSelect = (key: string, keyPath: string[]) => {
    //   console.log(key, keyPath);
    // };
    return {
      tabItems,
      route,
      isLogin,
      userInfo,
      logout,
      drawerVis
    };
  }
});
</script>

<style scoped>
@import './NavBar.css';
/* .opencartbutton {
  align-self: center;
} */
/* .NavBar {
  display: flex;
  align-items: center;
  background-color: #545c64;
  height: 70px;
}
.el-menu {
  border-right: 0;
  height: inherit;
  flex-grow: 1;
}
.login-regiser-cart {
  flex-grow: 1;
  display: flex;
  justify-content: end;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  margin-right: 3%;
}
.hello-user {
  color: aliceblue;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  margin-right: 1%;
} */
</style>
