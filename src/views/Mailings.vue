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
    </tr>
  </table>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions({
      getMailings: 'mailings/getMailings',
      deleteMailing: 'mailings/deleteMailing',
    }),
  },
  created() {
    this.getMailings();
  },
};
</script>

<style></style>
