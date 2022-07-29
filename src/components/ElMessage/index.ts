import Message from './src/message'
import { withInstallFunction } from '@/utils/global.config'

export const ElMessage = withInstallFunction(Message, '$message')
export default ElMessage
