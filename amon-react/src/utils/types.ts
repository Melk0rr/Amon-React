/**
 * Basic Map interface for Type check
 */
 type BaseMap = {
  [key: string | number]: any
}

/**
 * Basic Object interface for Type check
 */
type BaseObject = {
  [key: string]: any
}

export type {
  BaseMap,
  BaseObject,
}