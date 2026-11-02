<!-------------------------------------------
              FOOTER
  Адаптивный компонент подвала (desktop / mobile).

  Точки адаптивности:
  
    desktop : min-width 769px
    mobile  : max-width 768px

  Тематические подварианты (берутся от родителя):
    .main    — фиолетовая тема   (--purple-main)
    .editor  — красная тема      (--red-editor)
    .review  — зелёная тема      (--green-review)

  Зависимости: color_tokens.css, new_text_styles.css
  (текст внутри набирается классами basic-text-bold / text-h2 / hyperlinks)
--------------------------------------------->

<script setup>
// в разработке
</script>

<template>
  <footer class="site-footer">
    <!-- Информация о журнале -->
    <div class="content-block-vertical site-footer-section">
      <span class="text-h2">Информация о журнале</span>
      <span class="basic-text"> Электронный ISSN: 2619-0117 </span>
      <span class="basic-text"> Печать ISSN: 2500-0101 </span>
    </div>

    <!-- Индексация журнала -->
    <div class="content-block-vertical site-footer-section">
      <span class="text-h2">Индексируется в базах</span>
      <div class="content-block-horizontal">
        <a href="#" class="hyperlinks">Scopus</a>
        <a href="#" class="hyperlinks">MathSciNet</a>
        <a href="#" class="hyperlinks">Math-Net.Ru</a>
        <a href="#" class="hyperlinks">CrossReff</a>
        <a href="#" class="hyperlinks">РИНЦ</a>
        <a href="#" class="hyperlinks">Ядро РИНЦ</a>
      </div>
    </div>
    <!-- Дополнительная информация -->
    <div class="content-block-horizontal site-footer-links">
      <div class="content-block-vertical site-footer-links-column">
        <span class="text-h2">Политики</span>
        <a href="#" class="hyperlinks"> Политики разделов журнала </a>
        <a href="#" class="hyperlinks"> Политика открытого доступа </a>
        <a href="#" class="hyperlinks"> Политика проверки на плагиат </a>
      </div>
      <div class="content-block-vertical site-footer-links-column">
        <span class="text-h2">Отправка статей</span>
        <a href="#" class="hyperlinks"> Отправка статей через интернет </a>
        <a href="#" class="hyperlinks"> Руководство для авторов </a>
        <a href="#" class="hyperlinks"> Правила рецензирования </a>
        <a href="#" class="hyperlinks"> Заявления о конфиденциальности </a>
      </div>
      <div class="content-block-vertical site-footer-links-column">
        <span class="text-h2">Люди</span>
        <a href="#" class="hyperlinks">Контакты</a>
        <a href="#" class="hyperlinks">Редакция</a>
        <a href="#" class="hyperlinks"> Правила рецензирования </a>
        <a href="#" class="hyperlinks"> Заявления о конфиденциальности </a>
      </div>
      <div class="content-block-vertical site-footer-links-column">
        <span class="text-h2">Прочее</span>
        <a href="#" class="hyperlinks">Карта сайта</a>
        <a href="#" class="hyperlinks">Об издательстве</a>
        <a href="#" class="hyperlinks">Прочее</a>
      </div>
    </div>

    <!-- Логотип -->
    <img alt="foot-logo" class="site-footer-logo" />
  </footer>
</template>

<style scoped>
.site-footer {
  box-sizing: border-box;
  width: 100%;
  padding: 30px 50px;
  gap: 16px;
  align-items: flex-end;
  justify-content: flex-end;
  background: var(--theme-gradient, var(--purple-gradient));
  color: white;
}

/* Общие стили содержимого футера */
.site-footer .text-h2,
.site-footer .basic-text,
.site-footer .hyperlinks {
  color: white;
}

/* Секции с информацией о журнале и индексации */
.site-footer-section {
  width: auto;
  flex: 1 1 180px;
  min-width: 160px;
  padding-bottom: 16px;
  padding-top: 16px;
  border-bottom: 2px solid white;
}

/* Блок с политиками, отправкой статей, людьми и прочим */
.site-footer-links {
  width: auto;
  flex: 2 1 520px;
  align-items: flex-start;
  padding-bottom: 16px;
  padding-top: 16px;
  border-bottom: 2px solid white;
}

.site-footer-links-column {
  width: auto;
  flex: 1 1 150px;
  min-width: 140px;
}

/* Логотип */
.site-footer-logo {
  display: block;
  width: 120px;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  flex: 0 0 auto;
  margin-left: auto;
}

/* Адаптация для мобильных устройств */
@media (max-width: 768px) {
  .site-footer {
    padding: 14px 25px;
    gap: 8px;
  }

  .site-footer-section {
    padding-bottom: 8px;
    padding-top: 8px;
  }

  .site-footer-links {
    padding-bottom: 8px;
    padding-top: 8px;
  }

  .site-footer-links-column {
    flex-basis: 140px;
    min-width: 120px;
  }

  .site-footer-logo {
    width: 100px;
  }
}
</style>
