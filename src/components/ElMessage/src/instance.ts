import type { ComponentInternalInstance, VNode } from 'vue'
import { shallowReactive } from 'vue'
import type { MessageHandler, MessageProps } from './types'
import type { Mutable } from '@/utils/utils'
export interface MessageContext {
  id: string
  vnode: VNode
  handler: MessageHandler
  vm: ComponentInternalInstance
  props: Mutable<MessageProps>
}
export const instances: MessageContext[] = shallowReactive([])

export const getInstance = (id: string) => {
  const idx = instances.findIndex(instance => instance.id === id)
  const current = instances[idx]
  let prev: MessageContext | undefined
  if (idx > 0)
    prev = instances[idx - 1]

  return { current, prev }
}

export const getLastOffset = (id: string): number => {
  const { prev } = getInstance(id)
  if (!prev)
    return 0
  return prev.vm.exposeProxy!.bottom
}
