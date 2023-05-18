<template>
  <div class="home">
    <div class="blur"></div>
    <div class="text"> Текст </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  background-image: url('../assets/home-page.webp');
  background-size: cover;
  position: relative;
  width: 100%;
  height: calc(100vh - 56px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.blur {
  position: absolute;
  background-color: black;
  opacity: 0.5;
  width: 100%;
  height: 100%;
}

.text {
  z-index: 1111;
  color: #fff;
}
</style>
