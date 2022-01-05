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
      <td v-if="!mailing.is_deleted">
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
    :pageCount="$store.state.mailings.pageCount"
    v-on:setPage="setPage"
    v-on:getElements="getElements"
  ></paginator>
</template>

<script>
import { mapActions } from 'vuex';
import Paginator from '@/components/Paginator.vue';

export default {
  data() {
    return {
      page: 1,
    };
  },
  emits: ['setPage', 'getElements'],
  methods: {
    setPage(pageNum) {
      this.$store.commit('mailings/SET_PAGE', pageNum);
    },
    getElements() {
      this.$store.dispatch('mailings/getMailings');
    },
    ...mapActions({
      getMailings: 'mailings/getMailings',
      deleteMailing: 'mailings/deleteMailing',
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
