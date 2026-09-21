import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Pagination } from "./Pagination";

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

export const LastPage: Story = {
  render: function Render() {
    const [page, setPage] = useState(5);
    return <Pagination page={page} totalPages={5} onPageChange={setPage} />;
  },
};

export const SinglePage: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);
    return <Pagination page={page} totalPages={1} onPageChange={setPage} />;
  },
};

export const LargePageCount: Story = {
  render: function Render() {
    const [page, setPage] = useState(12);
    return <Pagination page={page} totalPages={20} onPageChange={setPage} />;
  },
};
