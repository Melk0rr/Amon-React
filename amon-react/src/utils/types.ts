import { MouseEventHandler } from 'react'

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
  size?: number,
  style?: BaseObject,
  children?:JSX.Element | string | number,
}

interface CLickableElementProps extends HTMLElementProps {
  onClick?: MouseEventHandler,
}

export type {
  BaseMap,
  BaseObject,
  HTMLElementProps,
  CLickableElementProps,
}