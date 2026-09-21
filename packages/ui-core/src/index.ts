// AI-ASSISTED: Cursor
// PROMPT: Remove DropdownMenu exports
// ACCEPTED-BY: dhinesh

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

export { Alert, AlertTitle, AlertDescription } from "./Alert";
export type { AlertProps, AlertVariant } from "./Alert";

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
