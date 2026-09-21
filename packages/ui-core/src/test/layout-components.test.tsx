import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Alert, AlertDescription, AlertTitle } from "../Alert";
import { AspectRatio } from "../AspectRatio";
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar";
import { Badge } from "../Badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../Breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../Card";
import { Pagination } from "../Pagination";
import { Progress } from "../Progress";
import { ScrollArea } from "../ScrollArea";
import { Separator } from "../Separator";
import { Skeleton } from "../Skeleton";
import { Spinner } from "../Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../Table";
import { Chip, Tag } from "../Tag";
import { renderWithTheme } from "./test-utils";

describe("Badge", () => {
  it("applies variant class", () => {
    renderWithTheme(<Badge variant="destructive">Error</Badge>);
    expect(screen.getByText("Error")).toHaveClass("ax-badge-destructive");
  });
});

describe("Chip", () => {
  it("renders as Tag alias with chip styling", () => {
    renderWithTheme(<Chip variant="outline">Filter</Chip>);
    expect(screen.getByText("Filter")).toHaveClass("ax-tag-label");
    expect(screen.getByText("Filter").closest(".ax-tag")).toHaveClass(
      "ax-tag-outline",
    );
  });
});

describe("Tag", () => {
  it("calls onRemove when dismiss clicked", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    renderWithTheme(
      <Tag onRemove={onRemove} removeLabel="Remove filter">
        Design
      </Tag>,
    );
    await user.click(screen.getByRole("button", { name: "Remove filter" }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});

describe("Card", () => {
  it("renders compound sections", () => {
    renderWithTheme(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Body</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});

describe("Alert", () => {
  it("renders title and description", () => {
    renderWithTheme(
      <Alert>
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>All systems operational.</AlertDescription>
      </Alert>,
    );
    expect(screen.getByText("Info")).toBeInTheDocument();
    expect(screen.getByText("All systems operational.")).toBeInTheDocument();
  });

  it("applies destructive variant class", () => {
    renderWithTheme(
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to save.</AlertDescription>
      </Alert>,
    );
    expect(screen.getByText("Error").closest(".ax-alert")).toHaveClass(
      "ax-alert-destructive",
    );
  });
});

describe("Separator", () => {
  it("renders with separator role when not decorative", () => {
    renderWithTheme(<Separator decorative={false} />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });
});

describe("Avatar", () => {
  it("shows fallback when image absent", () => {
    renderWithTheme(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("renders avatar root with image and fallback slots", () => {
    const { container } = renderWithTheme(
      <Avatar data-testid="avatar">
        <AvatarImage src="/avatar.png" alt="User avatar" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByTestId("avatar")).toHaveClass("ax-avatar");
    expect(container.querySelector(".ax-avatar-fallback")).toHaveTextContent(
      "AB",
    );
  });
});

describe("Skeleton", () => {
  it("renders loading placeholder", () => {
    renderWithTheme(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveClass("ax-skeleton");
  });
});

describe("Progress", () => {
  it("renders progressbar with value", () => {
    renderWithTheme(<Progress value={40} aria-label="Upload" />);
    expect(
      screen.getByRole("progressbar", { name: "Upload" }),
    ).toBeInTheDocument();
  });
});

describe("Spinner", () => {
  it("exposes loading status", () => {
    renderWithTheme(<Spinner />);
    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
  });
});

describe("AspectRatio", () => {
  it("renders children inside ratio container", () => {
    renderWithTheme(
      <AspectRatio ratio={16 / 9}>
        <div>Media</div>
      </AspectRatio>,
    );
    expect(screen.getByText("Media")).toBeInTheDocument();
  });
});

describe("Table", () => {
  it("renders sortable header with aria-sort", async () => {
    const user = userEvent.setup();
    const onSort = vi.fn();
    renderWithTheme(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead sortable sortDirection="asc" onSort={onSort}>
              Name
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    const sortButton = screen.getByRole("button", { name: /Name/i });
    expect(sortButton).toHaveAttribute("aria-sort", "ascending");
    await user.click(sortButton);
    expect(onSort).toHaveBeenCalledTimes(1);
  });
});

describe("Pagination", () => {
  it("navigates pages and disables boundaries", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    renderWithTheme(
      <Pagination page={1} totalPages={3} onPageChange={onPageChange} />,
    );
    expect(screen.getByLabelText("Previous page")).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "2" }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});

describe("Breadcrumb", () => {
  it("renders navigation trail", () => {
    renderWithTheme(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Settings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText("Home")).toHaveAttribute("href", "/");
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });
});

describe("ScrollArea", () => {
  it("renders scrollable content", () => {
    renderWithTheme(
      <ScrollArea>
        <div>Scroll content</div>
      </ScrollArea>,
    );
    expect(screen.getByText("Scroll content")).toBeInTheDocument();
  });
});
