<template>
  <section class="nav-wrapper">
    <router-link to="/" class="breadcrumb">Главная ></router-link>

    <h1 class="page-title">Страница редактора</h1>

    <div class="tabs">
      <router-link to="/editor/tasks" class="tab" active-class="active"> Задачи </router-link>

      <router-link to="/editor/manuscripts" class="tab" active-class="active">
        Рукописи
      </router-link>

      <router-link to="/editor/analytics" class="tab" active-class="active">
        Аналитика
      </router-link>
    </div>
  </section>
</template>

<style scoped>
.nav-wrapper {
  padding: 30px 50px 150px 50px;
  background: var(--editor-gradient);
}

.breadcrumb {
  text-decoration: none;
  background: none;
  border: none;
  color: var(--white);
  font-family: 'Biryani', sans-serif;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
  margin-bottom: 10px;
  position: relative;
}

.breadcrumb::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 2px;
  background: white;
  transform: scaleX(0);
  transition: 0.2s ease;
}

.breadcrumb:hover::after {
  transform: scaleX(1);
}

.page-title {
  font-family: 'Lora', serif;
  color: white;
  font-size: 24px;
  margin: 0 0 25px 0;
}

.tabs {
  display: flex;
}

.tab {
  text-decoration: none;
  flex: 1;
  padding: 10px 180px;
  text-align: center;

  font-family: 'Lora', serif;
  font-size: 24px;

  background: none;
  border: none;
  color: white;
  cursor: pointer;

  position: relative;
}

/* линия */

.tab::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -6px;
  width: 100%;
  height: 3px;
  background: white;

  transform: translateX(-50%) scaleX(0);
  transform-origin: center;
  transition: transform 0.25s ease;
}

/* hover */
.tab:hover::after {
  transform: translateX(-50%) scaleX(1);
}

/* active */
.tab.active::after {
  transform: translateX(-50%) scaleX(1);
}
</style>
