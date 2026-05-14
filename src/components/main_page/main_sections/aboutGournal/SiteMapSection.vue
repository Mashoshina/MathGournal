<template>
  <div class="contents main-sections header-section">
    <!-- Заголовок -->
    <div class="text-blocks">
      <div class="title Lora-family large" style="color: white">Карта сайта</div>
    </div>
  </div>

  <div class="contents main-sections content">
    <div class="text-blocks">
      <div class="section-text" style="white-space: pre">
        <router-link to="/" class="hyper-links main over"> Главная страница </router-link>
        <br />
        <a href="https://cpmj.csu.ru/index.php/cpmj" target="_blank" class="hyper-links main over"
          >{{ '\t' }}Челябинский физико-математический журнал</a
        > 
        <br />
        <router-link to="/about" class="hyper-links main over"
          >{{ '\t' }}{{ '\t' }}О нас</router-link
        > 
        <br />
        <a
          href="https://cpmj.csu.ru/index.php/cpmj/login"
          target="_blank"
          class="hyper-links main over"
          >{{ '\t' }}{{ '\t' }}{{ '\t' }}Вход</a
        > 
        <br />
        <a
          href="https://cpmj.csu.ru/index.php/cpmj/user/register"
          target="_blank"
          class="hyper-links main over"
          >{{ '\t' }}{{ '\t' }}{{ '\t' }}Регистрация</a
        > 

        <br />
        <a
          href="https://cpmj.csu.ru/index.php/cpmj/search"
          target="_blank"
          class="hyper-links main over"
          >{{ '\t' }}{{ '\t' }}Поиск</a
        > 
        <br />
        <a
          href="https://cpmj.csu.ru/index.php/cpmj/search/authors"
          target="_blank"
          class="hyper-links main over"
          >{{ '\t' }}{{ '\t' }}{{ '\t' }}По авторам</a
        > 
        <br />
        <a
          href="https://cpmj.csu.ru/index.php/cpmj/search/titles"
          target="_blank"
          class="hyper-links main over"
          >{{ '\t' }}{{ '\t' }}{{ '\t' }}По названию</a
        >  <br />
        <p>{{ '\t' }}{{ '\t' }}Выпуски</p>
        <a
          href="https://cpmj.csu.ru/index.php/cpmj/issue/current"
          target="_blank"
          class="hyper-links main over"
          >{{ '\t' }}{{ '\t' }}{{ '\t' }}Текущий выпуск</a
        >
         <br />
        <a
          href="https://cpmj.csu.ru/index.php/cpmj/issue/archive"
          target="_blank"
          class="hyper-links main over"
          >{{ '\t' }}{{ '\t' }}{{ '\t' }}Архивы</a
        >
        <br />
        <a href="http://pkp.sfu.ca/ojs" target="_blank" class="hyper-links main over"
          >Open Journal Systems</a
        > 
        <br />
        <a
          href="javascript:openHelp('https://cpmj.csu.ru/index.php/index/help')"
          target="_blank"
          class="hyper-links main over"
          >Помощь</a
        > 
      </div>
    </div>
  </div>
</template>
