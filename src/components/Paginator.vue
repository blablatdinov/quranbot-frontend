<template>
  <router-link
    tag="a"
    class="paginator-link"
    :to="`ayats?page=${prevPage}`"
    @click="getPage(page - 1)"
    v-if="page > 1"
  >&lt;</router-link>
  <router-link
    tag="a"
    class="paginator-link"
    v-for="p in pages"
    :to="`ayats?page=${p.num}`"
    :key="p.num"
    @click="getPage(p.num)"
  >{{p.num}}</router-link>
  <router-link
    tag="a"
    class="paginator-link"
    :to="`ayats?page=${prevPage}`"
    v-if="page < $store.state.ayats.pageCount"
    @click="getPage(page + 1)"
  >&gt;</router-link>
  <a class="paginator-link">&gt;</a>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {
    getPage(pageNum) {
      this.$store.commit('ayats/SET_PAGE', pageNum);
      this.$store.dispatch('ayats/getAyats');
    },
  },
  computed: {
    pages() {
      const res = [];
      for (let i = 0; i < 5; i += 1) {
        res.push({
          num: i + this.page,
          active: this.page - 1 === i,
        });
      }
      return res;
    },
    prevPage() {
      return 1;
    },
  },
  props: ['page'],
};
</script>

<style scoped>
.paginator-link {
  margin: 0 5px 20px 5px;
}
</style>
