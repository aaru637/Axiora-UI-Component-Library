import { describe, expect, it } from "vitest";
import {
  countBy,
  distinctBy,
  exists,
  filterBy,
  findBy,
  groupBy,
  indexBy,
  paginate,
  partition,
  pluck,
  removeBy,
  search,
  sortBy,
  updateBy,
} from "./list.utils";

const users = [
  { id: 1, name: "Ada", email: "ada@axiora-ui.com", role: "admin" },
  { id: 2, name: "Bob", email: "bob@axiora-ui.com", role: "user" },
  { id: 3, name: "Cara", email: "ada@axiora-ui.com", role: "user" },
];

describe("List Utils", () => {
  it("findBy returns the first matching object", () => {
    expect(findBy(users, "id", 2)).toEqual(users[1]);
    expect(findBy(users, "id", 99)).toBe(null);
    expect(findBy(null as typeof users | null, "id", 1)).toBe(null);
  });

  it("filterBy and exists work with property values", () => {
    expect(filterBy(users, "role", "user")).toHaveLength(2);
    expect(exists(users, "email", "bob@axiora-ui.com")).toBe(true);
    expect(exists(users, "email", "missing@axiora-ui.com")).toBe(false);
  });

  it("removeBy and updateBy modify list items", () => {
    expect(removeBy(users, "id", 2)).toHaveLength(2);
    expect(updateBy(users, "id", 1, { role: "owner" })?.[0].role).toBe("owner");
  });

  it("sortBy sorts objects by property", () => {
    expect(sortBy(users, "name")?.map((user) => user.name)).toEqual([
      "Ada",
      "Bob",
      "Cara",
    ]);
  });

  it("groupBy, countBy, pluck, distinctBy, and indexBy transform lists", () => {
    expect(groupBy(users, "role")?.user).toHaveLength(2);
    expect(countBy(users, "role")).toEqual({ admin: 1, user: 2 });
    expect(pluck(users, "email")).toEqual([
      "ada@axiora-ui.com",
      "bob@axiora-ui.com",
      "ada@axiora-ui.com",
    ]);
    expect(distinctBy(users, "email")).toHaveLength(2);
    expect(indexBy(users, "id")?.["2"].name).toBe("Bob");
  });

  it("partition splits matching and non-matching items", () => {
    const [admins, others] = partition(users, (user) => user.role === "admin")!;

    expect(admins).toHaveLength(1);
    expect(others).toHaveLength(2);
  });

  it("search matches text across multiple keys", () => {
    expect(search(users, "bob", ["name", "email"])).toHaveLength(1);
    expect(search(users, "axiora-ui", ["name", "email"])).toHaveLength(3);
    expect(search(users, "", ["name"])).toHaveLength(3);
  });

  it("paginate returns a page of data with metadata", () => {
    expect(paginate(users, 1, 2)).toEqual({
      data: users.slice(0, 2),
      page: 1,
      pageSize: 2,
      total: 3,
      totalPages: 2,
    });
  });
});
