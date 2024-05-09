import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from '@storybook/test';
import { computed, onMounted } from 'vue';
import Button from './Button.vue';
import { userEvent, within, expect, waitFor } from '@storybook/test';
import './button.css';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/Button',
  component: Button,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    backgroundColor: { control: 'color' },
  },
  args: {
    primary: false,
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Button',
  },
};

export const Large: Story = {
  args: {
    label: 'Button',
    size: 'large',
  },
};

export const Small: Story = {
  args: {
    label: 'Button',
    size: 'small',
  },
};

export const Hover: Story = {
  args: {
    label: 'Button',
    primary: true,
    hover: true,
  },
}

export const BackgroundColor: Story = {
  render: (args) => ({
    components: { Button },
    template: `
      <button type="button" :class="classes" @click="onClick" :style="style">{{ args.label }}</button>
    `,
    setup() {
      const classes = computed(() => ({
        'storybook-button': true,
        'storybook-button--primary': args.primary,
        'storybook-button--secondary': !args.primary,
        [`storybook-button--${args.size}`]: true,
      }));

      const style = computed(() => ({
        backgroundColor: args.backgroundColor
      }));

      const onClick = () => {
        args.backgroundColor = 'red';
      }

    return { args, classes, style, onClick };
    },
  }),
  args: {
    label: 'Button',
    primary: true,
    size: 'medium',
    backgroundColor: 'black'
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    const buttonEl = canvas.getByRole("button");
    await step('Check bg color before click', async () => {
      await expect(buttonEl).toHaveStyle('background-color: rgb(0, 0, 0)');
    });
    await new Promise(resolve => setTimeout(resolve, 2500));
    await userEvent.click(buttonEl);
    await step('Check bg color after click', async () => {
      await expect(buttonEl).toHaveStyle('background-color: rgb(255, 0, 0)');
    });
  }
}