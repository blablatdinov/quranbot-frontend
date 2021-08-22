<template>
  <form>
    <input v-model="day" type="text">
    <div
      v-for="ayat in $store.state.contentGenerator.unusedAyats.slice(0, 10)"
      :key="ayat.id"
    >
      <input
        :id="ayat.id"
        type="checkbox"
        :value="ayat.id"
        v-model="checkedAyats"
      >
      <label :for="ayat.id" class="label-inline">{{ayat.sura}}:{{ayat.ayat}}</label>
    </div>
    <input type="submit" @click.prevent="postContent">
    <p>Отмеченные аяты: {{checkedAyats}}</p>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  methods: {
    postContent() {
      this.$store.dispatch('contentGenerator/postContent');
    },
  },
  computed: {
    ...mapGetters({
      day: 'contentGenerator/nextDay',
    }),
    checkedAyats: {
      get() {
        return this.$store.state.contentGenerator.checkedAyats;
      },
      set(val) {
        this.$store.commit('contentGenerator/setCheckedAyats', val);
      },
    },
  },
  created() {
    this.$store.dispatch('contentGenerator/getUnusedAyats');
    this.$store.dispatch('contentGenerator/getContents');
  },
};
</script>

<style>

</style>
