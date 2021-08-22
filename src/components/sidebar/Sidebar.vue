<template>
  <div class="sidebar" :style="{width: sidebarWidth}">
    <span
      @click="toggleSidebar"
      class="collapse-icon"
      :class="{'rotate-180': !$store.state.sidebar.collapsed}"
    ><i class="fas fa-angle-double-left" />
    </span>
    <SidebarLink to="/" icon="fas fa-chart-bar">Главная</SidebarLink>
    <SidebarLink to="/content-generator" icon="fas fa-list">Генерация контента</SidebarLink>
    <SidebarLink to="/ayats" icon="fas fa-book-open">Аяты</SidebarLink>
    <SidebarLink to="/mailings" icon="fas fa-envelope">Рассылки</SidebarLink>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import SidebarLink from './SidebarLink.vue';

export default {
  data() {
    return {
      sidebarWidthDefault: 200,
      sidebarWidthCollapsed: 50,
    };
  },
  components: {
    SidebarLink,
  },
  methods: {
    ...mapActions({
      toggleSidebar: 'sidebar/toggleSidebar',
    }),
  },
  computed: {
    sidebarWidth() {
      return `${this.$store.state.sidebar.collapsed ? this.sidebarWidthDefault : this.sidebarWidthCollapsed}px`;
    },
  },
};
</script>

<style>
.sidebar {
  color: white;
  background-color: #9b4dca;
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;
  padding-top: 40px;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}
.sidebar > a {
  color: white
}
.collapse-icon {
  position: absolute;
  top: 0;
  padding: 0.75em;

  transition: 0.2s linear
}
.rotate-180 {
  transform: rotate(180deg);

  transition: 0.2s linear
}
</style>
