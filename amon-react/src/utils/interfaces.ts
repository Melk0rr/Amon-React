/**
 * Basic Map interface for Type check
 */
 interface BaseMap {
  [key: string | number]: any
}

/**
 * Basic Object interface for Type check
 */
interface BaseObject {
  [key: string]: any
}

export type {
  BaseMap,
  BaseObject
}