<template>
  <button type="button" :class="classes" @click="onClick" :style="style">{{ label }} </button>
</template>

<script lang="ts" setup>
import './button.css';
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  /**
   * The label of the button
   */
  label: string,
  /**
   * primary or secondary button
   */
  primary?: boolean,
  /**
   * size of the button
   */
  size?: 'small' | 'medium' | 'large',
  /**
   * background color of the button
   */
  backgroundColor?: string,

  /**
   * hover color of the button
   */
  hover?: boolean,

}>(), { primary: false, hover: false });

const emit = defineEmits<{
  (e: 'click', id: number): void;
}>();

const classes = computed(() => {
  let styling = {
    'storybook-button': true,
    'storybook-button--primary': props.primary,
    'storybook-button--secondary': !props.primary,
    [`storybook-button--${props.size || 'medium'}`]: true,
  }
  if (props.hover) {
    const hover = { 'storybook-button--hover': props.hover || 'none' }
    styling = { ...styling, ...hover }
  }
  return styling;
});

const style = computed(() => ({
  backgroundColor: props.backgroundColor
}));

const onClick = () => {
  emit("click", 1)
};

</script>