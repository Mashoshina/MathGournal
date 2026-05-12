<template>
  <div class="page">
    <!-- Заголовок -->
    <div class="text-blocks">
      <div class="title Lora-family large">О журнале</div>
    </div>

    <!-- ЛЮДИ -->
    <div class="text-blocks">
      <div class="title Lora-family big">Люди</div>

      <ul class="section-text">
        <li>
          <router-link to="/about/people" class="hyper-links main over"> Контакты </router-link>
        </li>

        <li>
          <router-link to="/about/editorial" class="hyper-links main over"> Редакция </router-link>
        </li>
      </ul>
    </div>

    <!-- ПОЛИТИКИ -->
    <div class="text-blocks">
      <div class="title Lora-family big">Политики</div>

      <ul class="section-text">
        <li>
          <router-link to="/about/sections-policy" class="hyper-links main over">
            Политика разделов журнала
          </router-link>
        </li>

        <li>
          <router-link to="/about/plagiarism" class="hyper-links main over">
            Политика проверки на плагиат
          </router-link>
        </li>

        <li>
          <router-link to="/about/open-access" class="hyper-links main over">
            Политика открытого доступа
          </router-link>
        </li>
      </ul>
    </div>

    <!-- ОТПРАВКА СТАТЕЙ -->
    <div class="text-blocks">
      <div class="title Lora-family big">Отправка статей через интернет</div>

      <ul class="section-text">
        <li>
          <router-link to="/about/submission" class="hyper-links main over">
            Отправка статей через интернет
          </router-link>
        </li>

        <li>
          <router-link to="/about/authors-guide" class="hyper-links main over">
            Руководство для авторов
          </router-link>
        </li>

        <li>
          <router-link to="/about/review-rules" class="hyper-links main over">
            Правила рецензирования
          </router-link>
        </li>

        <li>
          <router-link to="/about/privacy" class="hyper-links main over">
            Заявление о конфиденциальности
          </router-link>
        </li>
      </ul>
    </div>

    <!-- ПРОЧЕЕ -->
    <div class="text-blocks">
      <div class="title Lora-family big">Прочее</div>

      <ul class="section-text">
        <li>
          <router-link to="/about/site-map" class="hyper-links main over">
            Карта сайта
          </router-link>
        </li>

        <li>
          <router-link to="/about/system" class="hyper-links main over">
            Об издательской системе
          </router-link>
        </li>

        <li>
          <router-link to="/about/sponsors" class="hyper-links main over">
            Спонсоры журнала
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
