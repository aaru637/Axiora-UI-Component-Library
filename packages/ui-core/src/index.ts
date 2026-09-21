/* Styles — consumers must import '@axiora-ui/ui-core/styles.css' once */

/* Form */
export { Button } from "./Button";
export type { ButtonProps, ButtonVariant } from "./Button";

export { Label } from "./Label";
export type { LabelProps } from "./Label";

export { Input } from "./Input";
export type { InputProps } from "./Input";

export { Textarea } from "./Textarea";
export type { TextareaProps } from "./Textarea";

export {
  Select,
  SelectRoot,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from "./Select";
export type { SelectProps, SelectOption } from "./Select";

export { NativeSelect } from "./NativeSelect";
export type { NativeSelectProps, NativeSelectOption } from "./NativeSelect";

export { Checkbox } from "./Checkbox";
export type { CheckboxProps } from "./Checkbox";

export { RadioGroup, Radio } from "./RadioGroup";
export type { RadioGroupProps, RadioProps } from "./RadioGroup";

export { Switch } from "./Switch";

export { Slider } from "./Slider";

export { Toggle } from "./Toggle";

export { Combobox } from "./Combobox";
export type { ComboboxProps, ComboboxOption } from "./Combobox";

export { Calendar, formatDisplayDate } from "./Calendar";
export type { CalendarProps } from "./Calendar";

export { DatePicker } from "./DatePicker";
export type { DatePickerProps } from "./DatePicker";

export { TimePicker, formatDisplayTime } from "./TimePicker";
export type { TimePickerProps, TimeValue } from "./TimePicker";

export { MultiSelect } from "./MultiSelect";
export type { MultiSelectProps, MultiSelectOption } from "./MultiSelect";

/* Overlay & menus */
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
} from "./ContextMenu";

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogOverlay,
  DialogPortal,
} from "./Dialog";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "./Command";
export type {
  CommandProps,
  CommandDialogProps,
  CommandItemProps,
} from "./Command";

export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerOverlay,
  DrawerPortal,
} from "./Drawer";
export type { DrawerSide } from "./Drawer";

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogOverlay,
  AlertDialogPortal,
} from "./AlertDialog";

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from "./Popover";

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipWrapper,
} from "./Tooltip";

export { HoverCard, HoverCardTrigger, HoverCardContent } from "./HoverCard";

/* Layout & display */
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./Card";

export { Badge } from "./Badge";
export type { BadgeProps, BadgeVariant } from "./Badge";

export { Tag, Chip } from "./Tag";
export type { TagProps, TagVariant, ChipProps, ChipVariant } from "./Tag";

export { useTableSort } from "./hooks/useTableSort";
export type {
  SortDirection,
  SortState,
  UseTableSortOptions,
} from "./hooks/useTableSort";

export { useTableFilter } from "./hooks/useTableFilter";
export type { UseTableFilterOptions } from "./hooks/useTableFilter";

export { useTablePagination } from "./hooks/useTablePagination";
export type { UseTablePaginationOptions } from "./hooks/useTablePagination";

export { Alert, AlertTitle, AlertDescription } from "./Alert";
export type { AlertProps, AlertVariant } from "./Alert";

export {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  Toaster,
} from "./Toast";
export type { ToastProps, ToasterProps, ToastActionElement } from "./Toast";

export { toast, useToast, dismissToast } from "./useToast";
export type { ToastData, ToastVariant } from "./useToast";

export { Separator } from "./Separator";

export { Avatar, AvatarImage, AvatarFallback } from "./Avatar";

export { Skeleton } from "./Skeleton";
export type { SkeletonProps } from "./Skeleton";

export { Progress } from "./Progress";

export { Spinner } from "./Spinner";
export type { SpinnerProps, SpinnerSize } from "./Spinner";

export { AspectRatio } from "./AspectRatio";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./Table";
export type { TableHeadProps } from "./Table";

export { Pagination } from "./Pagination";
export type { PaginationProps } from "./Pagination";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./Breadcrumb";

export { ScrollArea, ScrollBar } from "./ScrollArea";

/* Navigation */
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./Accordion";

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./Collapsible";
