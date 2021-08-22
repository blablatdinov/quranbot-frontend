<template>
  <table>
    <tr>
      <th>Аят:</th>
      <th>Содержание:</th>
      <th>День рассылки:</th>
    </tr>
    <tr v-for="ayat in $store.state.ayats.ayats" :key="ayat.id">
      <td>
        <strong>
          <router-link
            :to="`/ayats/${ayat.id}`"
          >{{ ayat.sura }}:{{ ayat.ayat }}
          </router-link>
        </strong>
      </td>
      <td>{{ ayat.content }}</td>
      <td>{{ ayat.content_day }}</td>
    </tr>
  </table>
  <paginator :page="page"></paginator>
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
  components: {
    Paginator,
  },
  methods: {
    ...mapActions({
      getAyats: 'ayats/getAyats',
    }),
  },
  created() {
    this.getAyats();
  },
};
</script>

<style>

</style>
