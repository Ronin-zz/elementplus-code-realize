import type { App } from 'vue'
import { createApp } from 'vue'
import Loading from './Loading.vue'
import { withInstallFunction } from '@/utils/global.config'

const createLoading = () => {
  const div = document.createElement('div')
  document.body.appendChild(div)
  return createApp(Loading).mount(div)
}
createLoading.show = () => {
  console.log('show')
}
createLoading.close = () => {

}
export const loading = withInstallFunction(Loading, '$loading')

export default {
  loading: null,
  app: null,
  install(app: App) {
    if (this.loading) { this.app.config.globalProperties.$loading = this.loading }
    else {
      const instance = createApp(Loading)
      const body = document.body
      const div = document.createElement('div')
      body.appendChild(div)
      this.loading = instance.mount(div) as any
      this.app.config.globalProperties.$loading = this.loading
    }
  },
}

// export default Loading
