/* Точка входа в приложение, отвечает за импорт стилей, 
создание экземпляра Vue-приложения с корневым компонентом App.vue, 
подключение роутера и хранилища Pinia, 
а также монтирование всего приложения в элемент с id app */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Импорт навигации
import { createPinia } from 'pinia' // Подключение Pinia — позволяет компонентам напрямую получать и обновлять данные без сложной передачи через props
import './styles/main.css' // Импорт стилей

const app = createApp(App) // создание приложения

app.use(createPinia())
app.use(router)

app.mount('#app')
