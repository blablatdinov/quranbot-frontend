<template>
  <router-link :to="to" class="link">
    <i :class="icon"></i>
    <transition name="fade">
      <span v-if="$store.state.sidebar.collapsed">
        <slot />
      </span>
    </transition>
  </router-link>
</template>

<script>
export default {
  props: {
    to: { type: String, required: true },
    icon: { type: String, required: false },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.link {
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  align-items: center;
  cursor: pointer;
  position: relative;
  font-weight: 400;
  user-select: none;
  margin: 10px 0 0 0;
  padding: 0.4em;
  border-radius: 0.25em;
  height: 1.5em;
  color: white;
  text-decoration: none;
}

.link > span {
  margin: 0 0 0 10px;
}

.link .icon {
  flex-shrink: 0;
  width: 25px;
  margin-right: 10px;
}
</style>
