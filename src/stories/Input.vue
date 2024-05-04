<template>
  <input type="text" name="name" :placeholder="placeholder">
</template>

<script lang="ts" setup>
import './input.css';

withDefaults(defineProps<{
  /**
   * The input placeholder
   */
  placeholder: string,
}>(), { placeholder: 'Type something...' });

</script>