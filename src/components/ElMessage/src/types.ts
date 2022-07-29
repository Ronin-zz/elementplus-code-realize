import type { AppContext, ExtractPropTypes, PropType, VNode } from 'vue'
import { isClient } from '@vueuse/core'
import type { Mutable } from '@/utils/utils'
export const definePropType = <T>(val: any): PropType<T> => val

export const messageDefaults = {
  customClass: '',
  center: false,
  dangerouslyUseHTMLString: false,
  duration: 1000,
  icon: '',
  id: '',
  message: '',
  onClose: undefined,
  showClose: false,
  type: 'info',
  offset: 16,
  zIndex: 0,
  grouping: false,
  repeatNum: 1,
  appendTo: isClient ? document.body : (undefined as never),
} as const

export const messageTypes = ['success', 'info', 'warning', 'error'] as const

export type messageType = typeof messageTypes[number]

export const messageProps = {
  customClass: {
    type: String,
    default: messageDefaults.customClass,
  },
  center: {
    type: Boolean,
    default: messageDefaults.center,
  },
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: messageDefaults.dangerouslyUseHTMLString,
  },
  duration: {
    type: Number,
    default: messageDefaults.duration,
  },
  id: {
    type: String,
    default: messageDefaults.id,
  },
  message: {
    type: definePropType<string | VNode | (() => VNode)>([
      String,
      Object,
      Function,
    ]),
    default: messageDefaults.message,
  },
  onClose: {
    type: definePropType<() => void>(Function),
    required: false,
  },
  showClose: {
    type: Boolean,
    default: messageDefaults.showClose,
  },
  type: {
    type: String,
    values: messageTypes,
    default: messageDefaults.type,
  },
  offset: {
    type: Number,
    default: messageDefaults.offset,
  },
  zIndex: {
    type: Number,
    default: messageDefaults.zIndex,
  },
  grouping: {
    type: Boolean,
    default: messageDefaults.grouping,
  },
  repeatNum: {
    type: Number,
    default: messageDefaults.repeatNum,
  },
} as const

export type MessageProps = ExtractPropTypes<typeof messageProps>

export interface MessageHandler {
  close: () => void
}

export const messageEmits = {
  destroy: () => true,
}
export type MessageEmits = typeof messageEmits

export type MessageOptions = Partial<
  Mutable<
    Omit<MessageProps, 'id'> & {
      appendTo?: HTMLElement | string
    }
  >
>

export type MessageParams = MessageOptions | MessageOptions['message']

export interface MessageFn {
  (options?: MessageParams, appContext?: null | AppContext): MessageHandler
  closeAll(type?: messageType): void
}
export type MessageOptionsWithType = Omit<MessageOptions, 'type'>
export type MessageParamsWithType =
  | MessageOptionsWithType
  | MessageOptions['message']

export type MessageTypedFn = (
  options?: MessageParamsWithType,
  appContext?: null | AppContext
) => MessageHandler

export interface Message extends MessageFn {
  success: MessageTypedFn
  warning: MessageTypedFn
  info: MessageTypedFn
  error: MessageTypedFn
}

export type MessageParamsNormalized = Omit<MessageProps, 'id'> & {
  appendTo: HTMLElement
}
