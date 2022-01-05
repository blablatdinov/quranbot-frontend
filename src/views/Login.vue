<template>
  <div class="flex-container">
    <div class="login_form">
      <form>
        <label for="username">Имя пользователя</label>
        <input
v-model="username" type="text" id="username" />
        <label for="password">Пароль</label>
        <input
v-model="password" type="password" id="password" />
        <button @click.prevent="login">Авторизоваться</button>
        <ul>
          <li v-for="error in $store.state.auth.loginErrors"
class="error-item" :key="error">
            {{ error }}
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: 'blablatdinov',
      password: 'ehodof21',
    };
  },
  methods: {
    login() {
      this.vuexLogin({
        username: this.username,
        password: this.password,
      });
    },
    ...mapActions({
      vuexLogin: 'auth/login',
    }),
  },
};
</script>

<style>
.flex-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login_form {
  background-color: white;
  padding: 20px 40px 5px 40px;
  border-radius: 20px;
  box-shadow: 8px 8px 12px 0px rgba(34, 60, 80, 0.2);
}
.error-item {
  color: red;
}
</style>
