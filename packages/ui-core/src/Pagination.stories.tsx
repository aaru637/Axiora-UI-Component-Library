import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Pagination } from "./Pagination";

// AI-ASSISTED: Cursor
// PROMPT: Fix Pagination story types for render-only stories
// ACCEPTED-BY: dhinesh

const meta = {
  title: "Core/Pagination",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);
    return <Pagination page={page} totalPages={5} onPageChange={setPage} />;
  },
};

export const ManyPages: Story = {
  render: function Render() {
    const [page, setPage] = useState(5);
    return <Pagination page={page} totalPages={10} onPageChange={setPage} />;
  },
};

export const FirstPage: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);
    return <Pagination page={page} totalPages={3} onPageChange={setPage} />;
  },
};
