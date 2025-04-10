interface _DeepPartialArray<T> extends Array<DeepPartial<T>> {}
/** @private */
type _DeepPartialObject<T> = { [P in keyof T]?: DeepPartial<T[P]> }

// biome-ignore lint/complexity/noBannedTypes: Use of Function type is expected as we are building a utility type
export type DeepPartial<T> = T extends Function
  ? T
  : T extends Array<infer U>
    ? _DeepPartialArray<U>
    : T extends object
      ? _DeepPartialObject<T>
      : T | undefined
