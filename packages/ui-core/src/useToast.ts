import { useEffect, useState } from "react";

export type ToastVariant = "default" | "destructive";

export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  open?: boolean;
  actionLabel?: string;
  onAction?: () => void;
}

type ToastInput = Omit<ToastData, "id"> & { id?: string };

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 300;

let count = 0;

function createId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type Action =
  | { type: "ADD"; toast: ToastData }
  | { type: "UPDATE"; toast: Partial<ToastData> & { id: string } }
  | { type: "DISMISS"; toastId?: string }
  | { type: "REMOVE"; toastId?: string };

interface State {
  toasts: ToastData[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function addToRemoveQueue(toastId: string) {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: "REMOVE", toastId });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
}

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    case "UPDATE":
      return {
        ...state,
        toasts: state.toasts.map((item) =>
          item.id === action.toast.id ? { ...item, ...action.toast } : item,
        ),
      };
    case "DISMISS": {
      const { toastId } = action;

      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((item) => addToRemoveQueue(item.id));
      }

      return {
        ...state,
        toasts: state.toasts.map((item) =>
          item.id === toastId || toastId === undefined
            ? { ...item, open: false }
            : item,
        ),
      };
    }
    case "REMOVE":
      if (action.toastId === undefined) {
        return { ...state, toasts: [] };
      }
      return {
        ...state,
        toasts: state.toasts.filter((item) => item.id !== action.toastId),
      };
    default:
      return state;
  }
}

export function toast(input: ToastInput) {
  const id = input.id ?? createId();

  const update = (props: ToastInput) =>
    dispatch({ type: "UPDATE", toast: { ...props, id } });

  const dismiss = () => dispatch({ type: "DISMISS", toastId: id });

  dispatch({
    type: "ADD",
    toast: {
      ...input,
      id,
      open: true,
    },
  });

  return { id, dismiss, update };
}

export function dismissToast(toastId?: string) {
  dispatch({ type: "DISMISS", toastId });
}

/** Clears all toasts — intended for test isolation. */
export function resetToasts() {
  toastTimeouts.forEach((timeout) => clearTimeout(timeout));
  toastTimeouts.clear();
  memoryState = { toasts: [] };
  listeners.forEach((listener) => listener(memoryState));
}

export function useToast() {
  const [state, setState] = useState<State>(memoryState);

  useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss: dismissToast,
  };
}
