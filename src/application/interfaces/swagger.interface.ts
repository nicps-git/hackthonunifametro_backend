import { Type } from '@nestjs/common';

export type TApiBodyDTO =
  | string
  | (() => void)
  | Type<unknown>
  | [() => void]
  | undefined;

export type TSuccessTypeDTO =
  | string
  | (() => void)
  | Type<unknown>
  | [() => void]
  | undefined;

export type TProperties = Array<{
  prop: string;
  required?: boolean;
  type?: string;
  itemType?: string;
  description?: string;
}>;
