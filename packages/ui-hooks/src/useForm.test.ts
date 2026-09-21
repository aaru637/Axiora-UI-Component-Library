import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useForm } from "./useForm";

interface LoginForm {
  email: string;
  password: string;
}

describe("useForm", () => {
  it("updates field values", () => {
    const { result } = renderHook(() =>
      useForm<LoginForm>({
        initialValues: { email: "", password: "" },
      }),
    );

    act(() => {
      result.current.setFieldValue("email", "user@example.com");
    });

    expect(result.current.values.email).toBe("user@example.com");
  });

  it("sets validation errors and skips submit", async () => {
    const onSubmit = vi.fn();

    const { result } = renderHook(() =>
      useForm<LoginForm>({
        initialValues: { email: "", password: "" },
        validate: (values) =>
          values.email ? {} : { email: "Email is required" },
        onSubmit,
      }),
    );

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.errors.email).toBe("Email is required");
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("calls onSubmit with valid values", async () => {
    const onSubmit = vi.fn();

    const { result } = renderHook(() =>
      useForm<LoginForm>({
        initialValues: { email: "user@example.com", password: "secret" },
        validate: () => ({}),
        onSubmit,
      }),
    );

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(onSubmit).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "secret",
    });
  });

  it("resets values and errors", () => {
    const { result } = renderHook(() =>
      useForm<LoginForm>({
        initialValues: { email: "", password: "" },
      }),
    );

    act(() => {
      result.current.setFieldValue("email", "changed@example.com");
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.values.email).toBe("");
    expect(result.current.errors).toEqual({});
  });
});
