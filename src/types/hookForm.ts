import { Control } from "react-hook-form";

export type FormSetValueFunction = (name: string, value: unknown) => void;

export type FormControl = Control<Record<string, unknown>>;

export type FormRegister = (
  Ref?,
  validateRule?
) => React.LegacyRef<HTMLInputElement>;

export type FallbackFormRegister = (ref?) => void | any;

export type SetValue = (
  name: string,
  value: any,
  option?: { shouldDirty: boolean }
) => void;

export type SetError = (name: string, value: { message: string }) => void;

export type ClearErrors = (name: string) => void;

export type Reset = (formValue?: any, options?: any) => void;

export type Event = {
  target?: HTMLInputElement;
  currentTarget?: HTMLInputElement;
};

export type GetValues = (fieldName?: string) => any;

export type Append = (data: any) => void;

export type Insert = (index: number, data: any) => void;
