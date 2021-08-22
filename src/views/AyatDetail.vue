<template>
  <div>
    <form>
      <InputUI id="additional_content" type="text" :content="ayat.additional_content" name="Дополнительный контент:" />
      <InputUI id="content" type="textarea" :content="ayat.content" name="Текст аята:"/>
      <InputUI id="arab_text" type="textarea" :content="ayat.arab_text" name="Арабский текст:"/>
      <InputUI id="trans" type="textarea" :content="ayat.trans" name="Транслитерация:"/>
      <InputUI id="sura-num" type="text" :content="String(ayat.sura)" name="Номер Суры:" :disabled="true" />
      <InputUI id="ayat-num" type="text" :content="ayat.ayat" name="Номер Аята:" :disabled="true"/>
      <InputUI id="html" type="textarea" :content="ayat.html" name="HTML:"/>
    </form>
  </div>
</template>

<script>
import axios from '@/api/backend';
import InputUI from '@/components/Input.vue';

export default {
  data() {
    return {
      ayat: {},
    };
  },
  components: {
    InputUI,
  },
  async beforeCreate() {
    const response = await axios.get(`/api/v1/ayats/${this.$route.params.id}/`);
    const ayat = await response.data;
    this.ayat = ayat;
  },
};
</script>

<style>

</style>
