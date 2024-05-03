<template>
  <div class="modal-backdrop" v-if="visible">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          This is the default title!
        </slot>
        <button
          type="button"
          class="btn-close"
          @click="onClose"
        >
          x
        </button>
      </header>

      <section class="modal-body">
        <slot name="body">
          This is the default body!
        </slot>
      </section>

      <footer class="modal-footer">
        <slot name="footer">
          This is the default footer!
        </slot>
        <button
          type="button"
          class="btn-green"
          @click="onClose"
        >
          Close Modal
        </button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import './modal.css';

withDefaults(defineProps<{
  /**
   * If the modal is visible or not
   */
  visible: boolean,
}>(), { visible: false });

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const onClose = () => {
  emit("close");
};

</script>