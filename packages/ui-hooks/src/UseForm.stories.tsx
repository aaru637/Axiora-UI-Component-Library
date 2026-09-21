import type { Meta, StoryObj } from "@storybook/react-vite";

import { useForm } from "./useForm";

interface DemoForm {
  email: string;
  password: string;
}

function UseFormDemo() {
  const { values, errors, isSubmitting, handleChange, handleSubmit, reset } =
    useForm<DemoForm>({
      initialValues: { email: "", password: "" },
      validate: (formValues) => {
        const nextErrors: Partial<Record<keyof DemoForm, string>> = {};
        if (!formValues.email) {
          nextErrors.email = "Email is required";
        }
        if (!formValues.password) {
          nextErrors.password = "Password is required";
        }
        return nextErrors;
      },
      onSubmit: async () => {
        await new Promise((resolve) => window.setTimeout(resolve, 600));
      },
    });

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        maxWidth: 320,
      }}
    >
      <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        Email
        <input
          value={values.email}
          onChange={handleChange("email")}
          style={{ padding: 8 }}
        />
        {errors.email && (
          <span style={{ color: "var(--color-danger, #dc2626)", fontSize: 13 }}>
            {errors.email}
          </span>
        )}
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        Password
        <input
          type="password"
          value={values.password}
          onChange={handleChange("password")}
          style={{ padding: 8 }}
        />
        {errors.password && (
          <span style={{ color: "var(--color-danger, #dc2626)", fontSize: 13 }}>
            {errors.password}
          </span>
        )}
      </label>
      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting…" : "Sign in"}
        </button>
        <button type="button" onClick={reset}>
          Reset
        </button>
      </div>
    </form>
  );
}

const meta = {
  title: "Hooks/useForm",
  component: UseFormDemo,
  tags: ["autodocs"],
} satisfies Meta<typeof UseFormDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
