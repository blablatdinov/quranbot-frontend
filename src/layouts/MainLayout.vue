<template>
  <div class="main_layout">
    <sidebar />
    <div class="content" :class="{'shift-left': $store.state.sidebar.collapsed}">
      <h1>Quranbot admin panel</h1>
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar/Sidebar.vue';

export default {
  components: {
    Sidebar,
  },
};
</script>

<style>
.main_layout {
  background-color: white;
}
.content {
  margin-left: 60px;
}
.shift-left {
  margin-left: 180px;
  transition: 0.2s linear
}
</style>
