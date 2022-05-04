<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <el-menu-item
      v-for="item in tabItems"
      :key="item"
      :index="item.routepath"
      :route="{ path: item.routepath }"
    >
      {{ item.name }}
    </el-menu-item>
  </el-menu>
  <!-- <div class="h-6" /> -->
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { mainStore } from "@/store/main.store";
import { storeToRefs } from "pinia";
import { log } from "console";
import { computed } from "@vue/reactivity";

export default defineComponent({
  name: "Navbar",
  setup() {
    const route = useRoute();
    const path = computed(() => route.path);

    // 直接在 :default-active 加上 route.fullpath 即可完成重新載入頁面後，
    // 仍保持 Navbar 之 menu-item 在正確的 tab 上啟用

    // 另一種監聽路由的方法
    const activeIndex = ref();
    watch(route, (val) => {
      activeIndex.value = val.fullPath;
    });

    const tabItems = [
      {
        name: "Home",
        routepath: "/"
      },
      // {
      //   name: "Createuser",
      //   routepath: "/createuser"
      // },
      { name: "Login", routepath: "/login" },
      {
        name: "Menu",
        routepath: "/menu"
      },
      {
        name: "Myorder",
        routepath: "/myorder"
      }
      // {
      //   name: "Aboutme",
      //   routepath: "/aboutme"
      // }
    ];
    // const handleSelect = (key: string, keyPath: string[]) => {
    //   console.log(key, keyPath);
    // };
    return { activeIndex, tabItems, route, path };
  }
});
</script>

<style scoped>
.opencartbutton {
  align-self: center;
  margin-left: auto;
  margin-right: 1rem;
}
</style>
