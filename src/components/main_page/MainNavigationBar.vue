<script setup></script>

<template>
  <!-- ВЕРХНИЙ БАР -->
  <!-- ОБЛОЖКА САЙТА -->
  <div class="nav-wrapper">
    <!-- ОБЛОЖКА ЖУРНАЛА -->
    <img src="/Обложка.jpg" alt="cover" class="cover" />
    <div class="chfmzh">Челябинский физико-математический журнал</div>
    <!-- ССЫЛКИ -->
    <div class="hyper-links">
      <a href="https://cpmj.csu.ru/roskom_cpmj.pdf" target="_blank">
        Свидетельство ПИ № ФС77-64248 о регистрации средства массовой информации в Роскомнадзоре
      </a>

      <a href="https://cpmj.csu.ru/svidet_cpmj.pdf" target="_blank">
        Свидетельство о регистрации в Национальном агентстве ISSN (печатное издание)
      </a>

      <a href="https://cpmj.csu.ru/e-ISSN2.pdf" target="_blank">
        Свидетельство о регистрации в Национальном агентстве ISSN (электронное издание)
      </a>
    </div>
  </div>
  <div class="side-bar">
    <button class="link-buttons main">О нас</button>

    <button class="link-buttons main">Текущий выпуск</button>

    <button class="link-buttons main">Архив</button>
  </div>
  <!-- ОПИСАНИЕ САЙТА -->
  <div class="description">
    <div class="section-name">О журнале</div>
    <div class="section-text">
      «Челябинский физико-математический журнал» является продолжением выпускавшихся с 1991 по 2015
      год серий «Математика. Механика. Информатика» и «Физика» журнала «Вестник Челябинского
      государственного университета». Журнал публикует научные статьи на русском и английском языках
      по всем основным разделам математики, механики, астрономии, физики, информатики,
      вычислительной техники и управления. Предназначен для научных работников, преподавателей,
      аспирантов и студентов старших курсов. Журнал издается с 2016 года, периодичность - 4 раза в
      год, в печатном и электронном виде.
    </div>
    <div class="section-text">
      «Челябинский физико-математический журнал» входит в Перечень рецензируемых научных изданий, в
      которых должны быть опубликованы основные научные результаты диссертаций на соискание ученых
      степеней кандидата и доктора наук.
    </div>
  </div>
</template>

<style scoped>
.nav-wrapper {
  position: relative;
  padding: var(--spacing-40) var(--spacing-50) var(--spacing-40) var(--spacing-50);
  background: var(--main-gradient);
}

.top-bar {
  left: 524px;
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);

  background: var(--white);
  border-top: var(--strock-sm) solid var(--purple-main);

  padding: var(--spacing-md) 50px;
}

.side-bar {
  margin-left: 534px;
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);

  background: var(--soft-purple);
  border-top: var(--strock-sm) solid var(--purple-main);

  padding: var(--spacing-md) 50px;
}

/* разделитель после кнопки "Поиск"*/
.divider {
  width: var(--strock-tn);
  height: 24px;
  background: #ccc;
}

/* обложка журнала*/
.cover {
  position: absolute;
  left: 80px;
  bottom: -285px;

  width: 454px;
  height: 638px;
  object-fit: cover;

  border: var(--strock-md) solid var(--white);
  border-radius: var(--radis-bg);
}

.chfmzh {
  padding: var(--spacing-40) var(--spacing-50) var(--spacing-40) var(--spacing-50);
  position: absolute;
  left: 538px;

  background: var(--white);
  font-size: var(--size-very-lg);
  font-family: var(--font-Lora);
  font-weight: var(--black-bold-weight);
}

.description {
  margin-left: 584px;
  margin-right: 80px;
}
</style>
