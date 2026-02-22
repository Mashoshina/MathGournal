<script setup>
import VueFeather from 'vue-feather'
</script>

<template>
  <header class="header">
    <div class="header-left">
      <img src="@/assets/logo.png" alt="logo" class="logo" />
      <div class="title">
        <div class="line black">Челябинский</div>
        <div class="line accent">физико-математический</div>
        <div class="line black right">журнал</div>
      </div>
    </div>

    <button class="profile-btn">
      Профиль
      <vue-feather type="user" size="24" />
    </button>
  </header>
</template>

<style scoped>
.header {
  height: 70px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo {
  width: 78px;
  height: 50px;
  object-fit: contain;
}

.title {
  font-family: 'Lora', serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0.01em;
  display: flex;
  flex-direction: column;
}

.line {
  line-height: 18px;
}

.right {
  align-self: flex-end;
}

.black {
  color: #000000;
}

.accent {
  color: #810e17;
}

.profile-btn {
  font-family: 'Biryani', sans-serif;
  font-size: 16px;
  font-weight: 300;

  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;

  background: none;
  border: none;
  cursor: pointer;

  color: #000;
  padding: 6px 0;
}

/* линия */
.profile-btn::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -4px; /* ниже текста */
  width: 100%;
  height: 2px;
  background-color: currentColor;

  transform: translateX(-50%) scaleX(0);
  transform-origin: center;
  transition: transform 0.25s ease;
}

/* hover */
.profile-btn:hover {
  color: #810e17;
}

.profile-btn:hover::after {
  transform: translateX(-50%) scaleX(1);
}
</style>
