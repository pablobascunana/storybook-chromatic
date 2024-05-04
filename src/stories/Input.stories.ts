import type { Meta, StoryObj } from '@storybook/vue3';
import Input from './Input.vue';

const meta = {
  title: 'Example/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    placeholder: 'Type something...'
  },
  // argTypes: {
  //   visible:{
  //     control: { type: 'boolean' },
  //   }
  // }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const input: Story = {
  args: {
    placeholder: 'Type...'
  },
}