<template>
  <div class="form-input-block">
    <label class="form-label" :for="id">{{ name }}</label>
    <template v-if="type === 'text'">
      <input
        class="form-input"
        :id="id"
        :type="type"
        :disabled="disabled"
        :value="content"
        @input="$emit('input', $event.target.value)"
      >
    </template>
    <template v-else-if="type === 'textarea'">
      <textarea
        class="form-input"
        :id="id"
        :type="type"
        :value="content"
        :disabled="disabled"
        @input="$emit('input', $event.target.value)"
      ></textarea>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    type: String,
    content: String,
    name: String,
    disabled: {
      type: Boolean,
      default: () => false,
    },
  },
  methods: {
    editContent() {
      this.$emit('input', 'content');
    },
  },
};
</script>

<style scoped>
.form-input-block>input {
  margin: 0;
}
.form-input-block {
  margin: 15px 0;
  display: flex;
  border-bottom: 0.5px solid #606c76;
}
.form-label {
  width: 30%;
}
</style>
