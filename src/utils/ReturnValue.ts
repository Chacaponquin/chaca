export type ReturnValue =
  | string
  | boolean
  | number
  | { [path: string]: ReturnValue }
  | Date
  | number[][]
  | string[]
  | null
  | number[];
