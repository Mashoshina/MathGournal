# front

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

# Разработка фронтенда для веб-прожения ЧФМЖ

## Устаревший дизайн для онлайн-версии журнала

### Разработать современный, интуитивно понятный и удобный пользовательскй интерфейс веб-приложения

### Поьзователи:

    - администратор
    - редактор
    - главный редактор
    - рецензент
    - автор+читатель

(роли могут пересекаться, например редактор может быть рецензентом, читателем и т.д.)

### Функции:

    - регистрация
    - авторизация
    - удаление аккаунта
    - поиск по статьям
    - чтение статей онлайн
    - скачивание файлов
    - загрузка файлов (статей, рецензий)
    - редактирование файлов (удаление, добавление)
    - администрирование (добавление, удаление пользователей)

### Функциональные требования:

    - пользователь может зарегистрироваться в системе
    - пользователь может войти в систему с помощью логина/почты и пароля
    - пользоватлю должен быть доступен функионал, соответствющий его роли
    - автор+читатель может отправить свою статью и читать другие
    - редактору доступна страница редактора
    - главному редактору доступна страница редактора с расширнным функционалом
    - рецензенту доступна страница реензента
    - админу доступна админ. панель
    - админ может добавлять тома, выпуски и наполнять их
    - админ может выдавать новых пользоватлей и удалять пользователей
    - админ может назначать и снимать роли пользователям
    - пользователь может загружать файлы с устройства в соответствии с функционалом
    - пользователь может удалять/скачивать доступные файлы в соответствии с функционалом
    - пользовтель может изменять данные учётной записи
    - пользователь может искать статьи по автору и/или названию

### Нефункциональные требования:

    - чем качественнее - тем лучше
    - чем быстрее - тем лучше
    - не "г*вн*код"
    - фонтенд на vue

### Ограничения:

    - сделать в срок

### Критерий готовности:

    - соответствие установленному тз и требованиям
    - открытый и доступный для всех сайт
