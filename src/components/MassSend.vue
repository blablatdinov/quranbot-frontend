<template>
  <div class="mass-send">
  <h2>Массовая рассылка:</h2>
  <br>
  <form>
    <textarea v-model="text"></textarea>
    <p>Резултат:</p>
    <div class="mass-send-result" v-html="text"></div>
    <button class="mass-send-btn" @click.prevent="sendToAdmin(text)">Тест</button>
    <button class="mass-send-btn" @click.prevent="send(text)">Отправить</button>
  </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      text: '',
    };
  },
  methods: {
    ...mapActions({
      send: 'mailings/send',
      sendToAdmin: 'mailings/sendToAdmin',
    }),
  },
};
</script>

<style>
.mass-send {
  margin: 0 0 0 15px;
  padding: 15px;
  display: block;
  border: solid #9b4dca
}
.mass-send-result {
  border: solid 1px #9b4dca;
  min-height: 50px;
  padding: 5px;
}
.mass-send-btn {
  margin: 10px 5px 0 0;
}
</style>
