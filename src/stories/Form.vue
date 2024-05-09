<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <input role="nameInput" type="text" name="name" :placeholder="namePlaceholder">
    </div>
    <div>
      <input role="emailInput" type="email" name="email" :placeholder="emailPlaceholder">
    </div>
    <div>
      <button name="submit" type="submit">{{ submitLabel }}</button>
    </div>
    <h4 class="submitted" v-if="visible">The information has been sent!</h4>
  </form>
</template>

<script lang="ts" setup>
import { withDefaults } from 'vue';

const { props, withDefaults } = withDefaults(defineProps<{
  /**
   * The placeholder for the name input
   */
  namePlaceholder: string,
  /**
   * The placeholder for the email input
   */
  emailPlaceholder: string,
  /**
   * The label for the submit button
   */
  submitLabel: string,
  /**
   * The sumitted message
   */
  visible: boolean,
}>(), { 
  namePlaceholder: 'Please, enter your name...',
  emailPlaceholder: 'Please, enter your email...',
  submitLabel: 'Submit information',
  visible: false
});

const handleSubmit = () => {
  
};
</script>

<style lang="css" scoped>
@import './form.css';
</style>
