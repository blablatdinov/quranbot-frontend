<template>
  <table>
    <tr>
      <th>Идентификатор:</th>
      <th>Кол-во получателей:</th>
      <th>Удалить:</th>
    </tr>
    <tr
      v-for="mailing in $store.state.mailings.mailings" :key="mailing.id"
    >
      <td>{{ mailing.id }}</td>
      <td>{{ mailing.recipients_count }}</td>
      <td v-if="!mailing.is_cleaned">
        <button @click="deleteMailing(mailing.id)">
          Удалить
        </button>
      </td>
      <td v-else>
        <p>Удалена</p>
      </td>
    </tr>
  </table>
  <paginator
    :page="page"
    :to="'mailings'"
    :pageCount="pageCont"
    v-on:setPage="setPage"
    v-on:getElements="getElements"
  ></paginator>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Paginator from '@/components/Paginator.vue';

export default {
  data() {
    return {};
  },
  emits: ['setPage', 'getElements'],
  methods: {
    setPage(pageNum) {
      this.$store.commit('mailings/SET_PAGE', pageNum);
    },
    getElements(pageNum) {
      this.$store.dispatch('mailings/getMailings', pageNum);
    },
    ...mapActions({
      getMailings: 'mailings/getMailings',
      deleteMailing: 'mailings/deleteMailing',
    }),
  },
  computed: {
    ...mapGetters({
      page: 'mailings/pageNum',
      pageCont: 'mailings/pageCount',
    }),
  },
  components: {
    Paginator,
  },
  created() {
    this.getMailings();
  },
};
</script>

<style></style>
