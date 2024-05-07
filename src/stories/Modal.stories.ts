import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from '@storybook/test';
import { computed } from 'vue';
import Modal from './Modal.vue';
import Button from './Button.vue';
import { Primary } from './Button.stories';
import { userEvent, within, expect } from '@storybook/test';

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

export const showModal = {
  render: (args) => ({
    components: { Modal, Button },
    template: `
      <button data-testid="button" type="button" size="small" :class="classes" @click="onClick" :style="style">{{ buttonLabel }}</button>
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
  },
};

export const PlayModal =  { ...showModal };

PlayModal.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const buttonElement = canvas.getByTestId("button");

  await userEvent.click(buttonElement);

  expect(buttonElement).toBeTruthy();
  await expect(canvas.getByText("This is the default modal title!")).toBeInTheDocument();
  await expect(canvas.getByText("This is the default modal body!")).toBeInTheDocument();
  await expect(canvas.getByText("This is the default modal footer!")).toBeInTheDocument();
};


Primary.args = {
  label: 'Show Modal',
  primary: true,
  size: 'large',
}