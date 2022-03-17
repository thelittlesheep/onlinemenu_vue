<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu"
    mode="horizontal"
    router
  >
    <el-menu-item v-for="item in tabItems" :key="item" :index="item.routepath"
      >{{ item.name }}
    </el-menu-item>
    <!-- <el-menu-item index="menu">Menu</el-menu-item>
    <el-menu-item index="createuser">Createuser</el-menu-item> -->
  </el-menu>
  {{ route.name }}
  <div class="h-6" />
</template>

<script lang="ts">
import { usepinia } from "@/store/pinia";
import { storeToRefs } from "pinia";
import { defineComponent, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

export default defineComponent({
  name: "Navbar",
  setup() {
    // const pinia = usepinia();
    // const { activeIndex } = storeToRefs(pinia);
    const route = useRoute();
    const activeIndex = ref("/");
    watch(route, (val) => {
      console.log(val.name);
      activeIndex.value = val.fullPath;
    });

    const tabItems = [
      {
        name: "Home",
        routepath: "/",
      },
      {
        name: "Createuser",
        routepath: "/createuser",
      },
      {
        name: "Menu",
        routepath: "/menu",
      },
      {
        name: "Aboutme",
        routepath: "/aboutme",
      },
    ];
    // const activeIndex2 = ref("1");
    // const handleSelect = (key: string, keyPath: string[]) => {
    //   console.log(key, keyPath);
    // };
    return { activeIndex, tabItems, route };
  },
  // watch: {
  //   $route() {
  //     console.log(this.$route.path);
  //   },
  // },
});
</script>
