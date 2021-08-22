<template>
  <content-fill-form />
  <div
    class="error"
    v-for="error in errors"
    :key="error"
  >
    {{error}}
  </div>
  <div v-for="content in existsContent" :key="content.id">
    <h2>День {{content.day}} Длина контента: {{content.content_length}}</h2>
    <p v-for="ayat in content.related_ayats" :key="ayat.id">
      <strong>{{ayat.sura}}:{{ayat.ayat}})</strong> {{ayat.content.slice(0, 100)}}...
    </p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ContentFillForm from '@/components/ContentFillForm.vue';

export default {
  data() {
    return {
    };
  },
  components: {
    ContentFillForm,
  },
  methods: {
    ...mapActions({
      getUnusedAyats: 'contentGenerator/getUnusedAyats',
      getContents: 'contentGenerator/getContents',
    }),
  },
  computed: {
    ...mapGetters({
      day: 'contentGenerator/nextDay',
      existsContent: 'contentGenerator/getExistsContent',
      errors: 'contentGenerator/getErrors',
    }),
  },
  created() {
    this.getUnusedAyats();
    this.getContents();
    // this.$store.state.contentGenerator.unusedAyats.slice(0, 5).forEach(element => {
    //   this.checkedAyats.push(element.id)
    // })
  },
};
</script>

<style>

</style>
