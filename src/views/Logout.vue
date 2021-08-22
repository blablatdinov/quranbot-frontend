<template>
  <h1>Logout</h1>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions({
      logout: 'auth/logout',
    }),
  },
};
</script>
