<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- Блок информации -->
      <div class="footer-info">
        <div class="section-name large" style="color: white">Информация о журнале</div>

        <!-- ISSN -->
        <div class="text-blocks" style="padding-bottom: 24px; border-bottom: 1px solid white">
          <div class="section-text inline-list" style="color: white; font-size: VAR(--size-bg)">
            <div>
              <div>Электронный ISSN</div>
              <div>2619-0117</div>
            </div>

            <div>
              <div>Печать ISSN</div>
              <div>2500-0101</div>
            </div>
          </div>
        </div>

        <!-- Индексация -->
        <div class="text-blocks" style="padding-bottom: 24px; border-bottom: 1px solid white">
          <div class="title Lora-family large" style="color: white">
            Индексируется в базах данных
          </div>

          <br />
          <div style="display: flex; gap: 32px; flex-wrap: wrap">
            <a href="https://www.scopus.com/sourceid/21100942105" class="hyper-links white"
              >Scopus</a
            >

            <a
              href="https://mathscinet.ams.org/mathscinet/search/journal/profile?groupId=6762"
              class="hyper-links white"
              >MathSciNet</a
            >

            <a
              href="http://www.mathnet.ru/php/journal.phtml?jrnid=chfmj&option_lang=rus"
              class="hyper-links white"
              >Math-Net.Ru</a
            >

            <a href="https://www.crossref.org/" class="hyper-links white">CrossRef</a>

            <a href="https://www.elibrary.ru/title_about_new.asp?id=62038" class="hyper-links white"
              >РИНЦ</a
            >

            <a href="https://www.elibrary.ru/title_about_new.asp?id=62038" class="hyper-links white"
              >Ядро РИНЦ</a
            >
          </div>
        </div>

        <div class="footer-columns">
          <div class="footer-column">
            <div class="text-blocks">
              <div class="title Lora-family large" style="color: white">Политики</div>
              <br />
              <router-link to="/about/sections-policy" class="hyper-links white">
                Политика разделов журнала
              </router-link>
              <br />
              <router-link to="/about/sections-policy" class="hyper-links white">
                Политика открытого доступа
              </router-link>
              <br />
              <router-link to="/about/sections-policy" class="hyper-links white">
                Политика проверки на плагиат
              </router-link>
            </div>
          </div>

          <div class="footer-column">
            <div class="text-blocks">
              <div class="title Lora-family large" style="color: white">Отправка статей</div>
              <br />
              <router-link to="/about/submission" class="hyper-links white">
                Отправка статей через Интернет
              </router-link>
              <br />
              <router-link to="/about/submission" class="hyper-links white">
                Руководство для авторов
              </router-link>
              <br />
              <router-link to="/about/submission" class="hyper-links white">
                Правила рецензирования
              </router-link>
              <br />
              <router-link to="/about/submission" class="hyper-links white">
                Заявление о конфиденциальности
              </router-link>
            </div>
          </div>

          <div class="footer-column">
            <div class="text-blocks">
              <div class="title Lora-family large" style="color: white">Люди</div>
              <br />
              <router-link to="/about/people" class="hyper-links white"> Контакты </router-link>
              <br />
              <router-link to="/about/editorial" class="hyper-links white"> Редакция </router-link>
            </div>
          </div>

          <div class="footer-column">
            <div class="text-blocks">
              <div class="title Lora-family large" style="color: white">Прочее</div>
              <br />
              <router-link to="/about/site-map" class="hyper-links white">
                Карта сайта
              </router-link>
              <br />
              <router-link to="/about/system" class="hyper-links white">
                Об издательской системе
              </router-link>
              <br />
              <router-link to="/about/sponsors" class="hyper-links white">
                Спонсоры журнала
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- Логотип -->
      <div class="footer-logo">
        <img src="@/assets/footer_logo.png" alt="Footer logo" />
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
  padding: 50px 72px;
  box-sizing: border-box;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.footer-info {
  display: flex;
  flex-direction: column;
}

.footer-logo img {
  width: 100px;
  height: auto;
  object-fit: contain;
}

.footer-columns {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 8px;
}

.footer-column {
  display: flex;
  flex-direction: column;
}
</style>
