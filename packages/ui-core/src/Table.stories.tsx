import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo, useState } from "react";

import { Badge } from "./Badge";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import { useTableSort } from "./hooks/useTableSort";
import { Pagination } from "./Pagination";
import { Tag } from "./Tag";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";

const meta = {
  title: "Core/Table",
  component: Table,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 560 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;

type Story = StoryObj;

type Invoice = {
  id: string;
  status: string;
  method: string;
  amount: number;
};

const invoices: Invoice[] = [
  { id: "INV001", status: "Paid", method: "Credit Card", amount: 250 },
  { id: "INV002", status: "Pending", method: "PayPal", amount: 150 },
  { id: "INV003", status: "Unpaid", method: "Bank Transfer", amount: 350 },
  { id: "INV004", status: "Paid", method: "Credit Card", amount: 120 },
  { id: "INV005", status: "Pending", method: "PayPal", amount: 89 },
  { id: "INV006", status: "Unpaid", method: "Bank Transfer", amount: 410 },
  { id: "INV007", status: "Paid", method: "Credit Card", amount: 199 },
];

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead style={{ textAlign: "right" }}>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.slice(0, 3).map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell>{invoice.id}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell style={{ textAlign: "right" }}>
              ${invoice.amount.toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Sortable: Story = {
  render: function Render() {
    const { sortedData, toggleSort, getSortDirection } = useTableSort<
      Invoice,
      "id" | "status" | "method" | "amount"
    >({
      data: invoices,
      getSortValue: (item, column) =>
        column === "amount" ? item.amount : item[column],
    });

    return (
      <Table>
        <TableCaption>Click column headers to sort.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead
              sortable
              sortDirection={getSortDirection("id")}
              onSort={() => toggleSort("id")}
            >
              Invoice
            </TableHead>
            <TableHead
              sortable
              sortDirection={getSortDirection("status")}
              onSort={() => toggleSort("status")}
            >
              Status
            </TableHead>
            <TableHead
              sortable
              sortDirection={getSortDirection("method")}
              onSort={() => toggleSort("method")}
            >
              Method
            </TableHead>
            <TableHead
              sortable
              sortDirection={getSortDirection("amount")}
              onSort={() => toggleSort("amount")}
              style={{ textAlign: "right" }}
            >
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.id}</TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell>{invoice.method}</TableCell>
              <TableCell style={{ textAlign: "right" }}>
                ${invoice.amount.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

export const WithPagination: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);
    const pageSize = 3;
    const totalPages = Math.ceil(invoices.length / pageSize);

    const pageData = useMemo(() => {
      const start = (page - 1) * pageSize;
      return invoices.slice(start, start + pageSize);
    }, [page]);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead style={{ textAlign: "right" }}>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell style={{ textAlign: "right" }}>
                  ${invoice.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    );
  },
};

export const DataDisplay: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const pageSize = 4;

    const filtered = useMemo(
      () =>
        statusFilter
          ? invoices.filter((row) => row.status === statusFilter)
          : invoices,
      [statusFilter],
    );

    const { sortedData, toggleSort, getSortDirection } = useTableSort<
      Invoice,
      "id" | "status" | "amount"
    >({
      data: filtered,
      getSortValue: (item, column) =>
        column === "amount" ? item.amount : item[column],
    });

    const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
    const pageData = sortedData.slice((page - 1) * pageSize, page * pageSize);

    const statusVariant = (status: string) => {
      if (status === "Paid") return "default" as const;
      if (status === "Pending") return "secondary" as const;
      return "destructive" as const;
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>
        <CardContent
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          <div className="ax-tag-group">
            {["Paid", "Pending", "Unpaid"].map((status) => (
              <Tag
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                onRemove={
                  statusFilter === status
                    ? () => {
                        setStatusFilter(null);
                        setPage(1);
                      }
                    : undefined
                }
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setStatusFilter(status);
                  setPage(1);
                }}
              >
                {status}
              </Tag>
            ))}
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  sortable
                  sortDirection={getSortDirection("id")}
                  onSort={() => toggleSort("id")}
                >
                  Invoice
                </TableHead>
                <TableHead
                  sortable
                  sortDirection={getSortDirection("status")}
                  onSort={() => toggleSort("status")}
                >
                  Status
                </TableHead>
                <TableHead
                  sortable
                  sortDirection={getSortDirection("amount")}
                  onSort={() => toggleSort("amount")}
                  style={{ textAlign: "right" }}
                >
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageData.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(invoice.status)}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell style={{ textAlign: "right" }}>
                    ${invoice.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Pagination
            page={Math.min(page, totalPages)}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </CardContent>
      </Card>
    );
  },
};
