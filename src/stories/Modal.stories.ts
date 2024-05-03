import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from '@storybook/test';
import { computed } from 'vue';
import Modal from './Modal.vue';
import Button from './Button.vue';
import { Primary } from './Button.stories';

const meta = {
  title: 'Example/Modal',
  component: Modal,
  subcomponents: { Button },
  tags: ['autodocs'],
  args: {
    onClose: fn(),
    visible: false
  },
  argTypes: {
    visible:{
      control: { type: 'boolean' },
    }
  }
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const modal: Story = {
  args: {
    visible: true,
  },
}

export const modalVisibility: Story = {
  render: (args) => ({
    components: { Modal, Button },
    template: `
      <button type="button" :class="classes" @click="onClick" :style="style">{{ buttonLabel }}</button>
      <modal :visible="args.visible" @close="closeModal"></modal>
    `,
    setup() {
      const buttonLabel = computed(() => Primary.args.label)
      const classes = computed(() => ({
        'storybook-button': true,
        'storybook-button--primary': Primary.args.primary,
        'storybook-button--secondary': !Primary.args.primary,
        [`storybook-button--${Primary.args.size}`]: true,
      }));

      const onClick = () => {
        args.visible = true;
      }

      const closeModal = () => {
        args.visible = false;
      }
    return { args, classes, buttonLabel, closeModal, onClick };
    },
  }),
  args: {
    visible: false,
  }
};
Primary.args = {
  label: 'Show Modal',
  primary: true,
  size: 'large',
}