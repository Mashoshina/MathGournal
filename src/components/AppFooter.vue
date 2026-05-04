<template>
  <footer class="footer">
    <!-- Заголовок -->
    <div class="footer-title">Информация о журнале</div>

    <!-- ISSN блок -->
    <div class="footer-issn">
      <div class="issn-block">
        <div>Электронный ISSN</div>
        <div>2619-0117</div>
      </div>

      <div class="issn-block">
        <div>Печать ISSN</div>
        <div>2500-0101</div>
      </div>
    </div>

    <!-- Логотип -->
    <img src="@/assets/footer_logo.png" alt="logo" class="footer-logo" />
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  margin-top: 40px;
  padding: 24px 40px;

  font-family: 'Biryani', sans-serif;
  color: var(--white);
}

.footer-title {
  font-family: 'Lora', serif;
  font-size: 24px;
  font-weight: 600;
}

/* ISSN строка */
.footer-issn {
  display: flex;
  gap: 120px;
}

/* Один блок ISSN */
.issn-block {
  display: flex;
  flex-direction: column;
  font-family: 'Biryani', sans-serif;
  color: var(--white);
  margin-top: 16px;
  gap: 16px;
}

/* Логотип */
.footer-logo {
  position: absolute;
  right: 20px;
  bottom: 20px;

  width: 80px;
  opacity: 0.9;
}
</style>
