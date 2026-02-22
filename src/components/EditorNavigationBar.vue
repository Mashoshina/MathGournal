<template>
  <section class="nav-wrapper">
    <!-- Кнопка Главная -->
    <button class="breadcrumb">Главная ></button>

    <!-- Заголовок -->
    <h1 class="page-title">Страница редактора</h1>

    <!-- Табы -->
    <div class="tabs">
      <button class="tab active">Задачи</button>
      <button class="tab">Рукописи</button>
      <button class="tab">Аналитика</button>
    </div>
  </section>
</template>

<style scoped>
.nav-wrapper {
  padding: 30px 50px 150px 50px;
  background: linear-gradient(90deg, #6f1c1c, #361919);
}

/* ----------------- */
/* Главная > */
/* ----------------- */

.breadcrumb {
  background: none;
  border: none;
  color: white;
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

/* ----------------- */
/* Заголовок */
/* ----------------- */

.page-title {
  font-family: 'Lora', serif;
  color: white;
  font-size: 24px;
  margin: 0 0 25px 0;
}

/* ----------------- */
/* Табы */
/* ----------------- */

.tabs {
  display: flex;
}

.tab {
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
