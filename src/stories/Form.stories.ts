import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import Form from './Form.vue';
import { userEvent, within, expect, waitFor } from '@storybook/test';

const meta = {
  title: 'Example/Form',
  component: Form,
  tags: ['autodocs'],
  args: {
    visible: false
  },
  argTypes: {
    visible:{
      control: { type: 'boolean' },
    }
  }
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;


export const EmptyForm: Story  = {
  render: (args) => ({
    components: { Form },
    template: `<Form :visible="args.visible" @submit="handleSubmit" />`, 
    setup() {
      const handleSubmit = () => {
        args.visible = true;
      };
  
      return { args, handleSubmit };
    },
  }),
  args: {
    visible: false,
  },
};

export const FilledForm: Story  = {
  render: (args) => ({
    components: { Form },
    template: `<Form :visible="args.visible" @submit="handleSubmit" />`, 
    setup() {
      const handleSubmit = () => {
        args.visible = true;
      };
  
      return { args, handleSubmit };
    },
  }),
  args: {
    visible: false,
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Enter info', async () => {
      await userEvent.type(canvas.getByRole('nameInput'), 'Jon Snow');
      await new Promise(resolve => setTimeout(resolve, 1000));
      await userEvent.type(canvas.getByRole('emailInput'), 'email@provider.com');
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    await step('Submit form', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /Submit/i }));
    });

    await step('Confirmation message', async () => {
      await expect(canvas.getByText("The information has been sent!")).toBeInTheDocument();
    });

  },
};

