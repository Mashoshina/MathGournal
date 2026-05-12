<script setup></script>

<template>
  <!-- ОБЛОЖКА САЙТА -->
  <div class="nav-wrapper">
    <!-- ОБЛОЖКА ЖУРНАЛА -->
    <img src="/Обложка.jpg" alt="cover" class="cover" />
    <div class="chfmzh">Челябинский физико-математический журнал</div>
    <!-- ССЫЛКИ -->
    <div class="text-blocks main-nav">
      <a href="https://cpmj.csu.ru/roskom_cpmj.pdf" target="_blank">
        Свидетельство ПИ № ФС77-64248 о регистрации средства массовой информации в Роскомнадзоре
      </a>

      <a href="https://cpmj.csu.ru/svidet_cpmj.pdf" target="_blank">
        Свидетельство о регистрации в Национальном агентстве ISSN (печатное издание)
      </a>

      <a href="https://cpmj.csu.ru/e-ISSN2.pdf" target="_blank">
        Свидетельство о регистрации в Национальном агентстве ISSN (электронное издание)
      </a>

      <b>Индекс 94191 в объединенном каталоге "Пресса России"</b>
    </div>
  </div>
  <div class="side-bar">
    <router-link to="/about" class="link-buttons main"> О нас </router-link>

    <button class="link-buttons main">Текущий выпуск</button>

    <button class="link-buttons main">Архив</button>
  </div>
  <!-- ОПИСАНИЕ САЙТА -->
  <div class="text-blocks" style="margin-left: 644px; margin-right: 80px; padding-bottom: 20px">
    <div class="title Lora-family large">О журнале</div>
    <div class="section-text">
      «Челябинский физико-математический журнал» является продолжением выпускавшихся с 1991 по 2015
      год серий «Математика. Механика. Информатика» и «Физика» журнала «Вестник Челябинского
      государственного университета».
      <br />
      Журнал публикует научные статьи на русском и английском языках по всем основным разделам
      математики, механики, астрономии, физики, информатики, вычислительной техники и управления.
      Предназначен для научных работников, преподавателей, аспирантов и студентов старших курсов.
      Журнал издается с 2016 года, периодичность - 4 раза в год, в печатном и электронном виде.
      <br />
      <a href="https://cpmj.csu.ru/VAK2.pdf" target="_blank"
        >«Челябинский физико-математический журнал» входит в Перечень рецензируемых научных изданий,
        в которых должны быть опубликованы основные научные результаты диссертаций на соискание
        ученых степеней кандидата и доктора наук.</a
      >
    </div>
  </div>
</template>

<style scoped>
.nav-wrapper {
  position: relative;
  padding: 40px 80px;
  background: var(--main-gradient);
}

.side-bar {
  margin-left: 590px;
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);

  background: var(--soft-purple);
  border-top: var(--strock-sm) solid var(--purple-main);

  padding: var(--spacing-md) 50px;
}

/* обложка журнала*/
.cover {
  position: absolute;
  left: 80px;
  bottom: -285px;

  width: 504px;
  height: 678px;
  object-fit: cover;

  border: var(--strock-md) solid var(--white);
  border-radius: var(--radis-bg);
}

.chfmzh {
  padding: var(--spacing-40) var(--spacing-50) var(--spacing-40) var(--spacing-50);
  position: absolute;
  left: 590px;

  background: var(--white);
  font-size: var(--size-very-lg);
  font-family: var(--font-Lora);
  font-weight: var(--black-bold-weight);
}
</style>
