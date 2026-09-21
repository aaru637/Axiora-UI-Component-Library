import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Chip, Tag } from "./Tag";

const meta = {
  title: "Core/Tag",
  component: Tag,
  tags: ["autodocs"],
  args: {
    children: "Filter",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline"],
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: "secondary" },
};

export const Dismissable: Story = {
  args: { variant: "secondary", onRemove: () => undefined },
};

export const FilterGroup: Story = {
  render: function Render() {
    const [tags, setTags] = useState([
      "Design",
      "Engineering",
      "Marketing",
      "Sales",
    ]);

    return (
      <div className="ax-tag-group">
        {tags.map((tag) => (
          <Tag
            key={tag}
            variant="secondary"
            onRemove={() =>
              setTags((current) => current.filter((t) => t !== tag))
            }
          >
            {tag}
          </Tag>
        ))}
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="ax-tag-group">
      <Tag variant="default">Primary</Tag>
      <Tag variant="secondary">Secondary</Tag>
      <Tag variant="outline">Outline</Tag>
      <Tag variant="secondary" onRemove={() => undefined}>
        Removable
      </Tag>
    </div>
  ),
};

/** `Chip` is an alias for `Tag` — same API, suited for filter chips. */
export const ChipAlias: Story = {
  render: () => (
    <div className="ax-tag-group">
      <Chip variant="secondary">Chip filter</Chip>
      <Chip variant="outline" onRemove={() => undefined}>
        Removable chip
      </Chip>
    </div>
  ),
};
