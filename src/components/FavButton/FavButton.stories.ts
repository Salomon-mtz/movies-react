import { Icon } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";
import FavButton from "./FavButton";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FavButton> = {
  title: "Movies/FavButton",
  component: FavButton,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {

  },
};

export default meta;
type Story = StoryObj<typeof FavButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
/**
 * Main FavButton with using the theme
 */
export const LargeVariant1: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {

  },
};
