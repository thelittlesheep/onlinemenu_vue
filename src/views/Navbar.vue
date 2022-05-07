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
      >
        <el-menu-item
          v-for="item in tabItems"
          :key="item.path"
          :index="item.path"
        >
          <!-- {{ item }} -->
          {{ item.name }}
        </el-menu-item>
        <!-- <el-menu-item> test </el-menu-item> -->
      </el-menu>
    </div>
    <div class="login-regiser">
      <el-button
        v-if="!isLogin"
        type="text"
        @click="router.push('/login')"
        ><span>登入/註冊</span></el-button
      ><span
        v-else
        class="hello-user"
        >您好! {{ userInfo.user_name }}</span
      >
      <!-- <el-button @click="getUser">hihih</el-button> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { mainStore } from "@/store/main.store";
import { storeToRefs } from "pinia";
import { computed } from "@vue/reactivity";
import { userStore } from "@/store/user.store";

export default defineComponent({
  name: "Navbar",
  setup() {
    const route = useRoute();
    const router = useRouter();
    // const path = computed(() => route.path);
    const { isLogin } = storeToRefs(mainStore());
    const userstore = userStore();
    const { userInfo } = storeToRefs(userstore);
    // 直接在 :default-active 加上 route.fullPath 即可完成重新載入頁面後，
    // 仍保持 Navbar 之 menu-item 在正確的 tab 上啟用
    // 另一種監聽路由的方法
    // const activeIndex = ref();
    // watch(route, (val) => {
    //   activeIndex.value = val.fullPath;
    // });

    // watch(isLogin, async (val) => {
    //   user.value = await userstore.getUserInfo();
    // });
    async function getUser() {
      if (isLogin.value === true) {
        console.log("NAVBAR");
        userInfo.value = await userstore.getUserInfo();
      }
    }

    watch(isLogin, async (val) => {
      userInfo.value = await userstore.getUserInfo();
    });

    const initData = getUser();

    const tabItems = [
      {
        name: "Home",
        path: "/"
      },
      {
        name: "Menu",
        path: "/menu"
      },
      {
        name: "Myorder",
        path: "/myorder"
      }
    ];

    // const handleSelect = (key: string, keyPath: string[]) => {
    //   console.log(key, keyPath);
    // };
    return { tabItems, route, router, isLogin, userInfo, initData };
  }
});
</script>

<style scoped>
/* .opencartbutton {
  align-self: center;
  margin-left: auto;
  margin-right: 1rem;
} */
.NavBar {
  display: flex;
  justify-content: center;
  /* align-content: center; */
  align-items: center;
  background-color: #545c64;
  height: 60px;
}
.el-menu {
  /* width: 100%; */
  border-right: 0;
  height: 60px;
  flex-grow: 1;
  /* background: seagreen; */
}
.login-regiser {
  /* background: yellow; */
  flex-grow: 1;
  display: flex;
  justify-content: end;
  padding-right: 3%;
}

.hello-user {
  color: aliceblue;
  font-weight: bold;
}
</style>
