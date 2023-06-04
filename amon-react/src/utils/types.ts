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

interface HTMLElementProps {
  id?: string,
  className?: string,
  style?: BaseObject,
  children?: any,
}

export type {
  BaseMap,
  BaseObject,
  HTMLElementProps,
}