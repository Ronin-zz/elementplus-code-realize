export type Mutable<T> = {
  - readonly [P in keyof T]: T[P]
}

export type HTMLElementCustomized<T> = HTMLElement & T

export type Nullable<T> = T | null

export type Arrayable<T> = T | T[]
export type Awaitable<T> = Promise<T> | T

export const isElement = (e: unknown): e is Element => {
  if (typeof Element === 'undefined')
    return false
  return e instanceof Element
}
