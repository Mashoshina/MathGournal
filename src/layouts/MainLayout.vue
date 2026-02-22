<template>
  <div class="layout">
    <header class="header">
      <h2>Челябинский физико-математический журнал</h2>
    </header>

    <div class="content">
      <aside class="sidebar">
        <p>Меню</p>
        <ul>
          <li>Статьи</li>
          <li>Рецензенты</li>
          <li>Профиль</li>
        </ul>
      </aside>

      <main class="main">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  background: #1e293b;
  color: white;
  padding: 15px;
}

.content {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 220px;
  background: #f1f5f9;
  padding: 15px;
}

.main {
  flex: 1;
  padding: 20px;
}
</style>
