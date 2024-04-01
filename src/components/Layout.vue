<template>
  <el-container class="full-height">
    <el-header class="header">
      <div class="nav-container">
        <router-link
          class="nav-item"
          to="/"
          style="color: inherit; text-decoration: none;"
        >
          <img
            style=" width: 11.42vw; height: 6.93vh;"
            src="@/assets/home.png"
            alt="首页"
          >
        </router-link>
        <router-link
          class="nav-item"
          to="/cutpaper"
          style="color: inherit; text-decoration: none;"
        >
          <img
            class="item-image"
            src="@/assets/paperTransfer.png"
            alt="闽南剪纸迁移"
          >
        </router-link>
        <router-link
          class="nav-item"
          to="/oldimgrepair"
          style="color: inherit; text-decoration: none;"
        >
          <img
            class="item-image"
            src="@/assets/oldPhoto.png"
            alt="闽南老照片修复"
          >
        </router-link>
        <router-link
          class="nav-item"
          to="/musictransfer"
          style="color: inherit; text-decoration: none;"
        >
          <img
            class="item-image"
            src="@/assets/musicTransfer.png"
            alt="闽南音乐风格迁移"
          >
        </router-link>
        <router-link
          class="nav-item"
          to="/movetransfer"
          style="color: inherit; text-decoration: none;"
        >
          <img
            class="item-image"
            src="@/assets/moveTransfer.png"
            alt="闽南剪纸动作迁移"
          >
        </router-link>
        <router-link
          class="nav-item"
          to="/puppettransfer"
          style="color: inherit; text-decoration: none;"
        >
          <img
            class="item-image"
            src="@/assets/puppetTransfer.png"
            alt="木偶头表情迁移"
          >
        </router-link>
        <router-link
          class="nav-item"
          to="/clothingtransfer"
          style="color: inherit; text-decoration: none;"
        >
          <img
            class="item-image"
            src="@/assets/dynasty.png"
            alt="朝代服妆迁移"
          >
        </router-link>
      </div>
    </el-header>
    <el-main
      class="main"
      :style="{ background: 'url(' + backgroundSrc + ')' ,width: '100%',height: '100%',backgroundSize: '100% 100%'}"
    >
      <transition name="scale" mode="out-in">
        <!-- <div :key="backgroundSrc" class="background" :style="{ backgroundImage: 'url(' + backgroundSrc + ')' }"></div> -->

        <router-view />
      </transition>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      backgroundSrc: ''
    };
  },
  watch: {
    // 监听路由变化，根据路由更新背景图片路径
    $route(to, from) {
      switch (to.path) {
        case '/cutpaper':
          this.backgroundSrc = require("@/assets/home/cutPaper.jpg");
          break;
        case '/movetransfer':
          this.backgroundSrc = require("@/assets/home/moveTransfer.jpg");
          break;
        case '/oldimgrepair':
          this.backgroundSrc = require("@/assets/home/oldImage.jpg");
          break;
        case '/clothingtransfer':
          this.backgroundSrc = require("@/assets/home/clothTransfer.jpg");
          break;
        case '/puppettransfer':
          this.backgroundSrc = require("@/assets/home/puppetTransfer.jpg");
          break;
        case '/musictransfer':
          this.backgroundSrc = require("@/assets/home/musicTransfer.jpg");
          break;
        default:
          this.backgroundSrc = require("@/assets/home/background.jpg");
          break;
      }
    }
  }
};
</script>

<style>
.full-height {
  height: 100vh; /* 设置容器的高度为100vh */
}
.header {
  background-color: antiquewhite;
  height: 8.5vh!important;
  border-top: 2px rgb(208, 56, 56) solid;
  border-left: 2px rgb(208, 56, 56) solid;
  border-right: 2px rgb(208, 56, 56) solid;
}
.nav-container {
  display: flex; /* 设置为flex布局 */
  justify-content: space-around; /* 均匀分布子元素 */
  align-items: center; /* 垂直居中 */
  height: 100%;
}
.nav-item {
  padding: 1.3vh 0.67vw; /* 调整导航键之间的间距 */
  transition: all 0.3s ease; /* 添加过渡效果 */
  color: inherit; /* 继承父元素的字体颜色 */
  text-decoration: none; /* 取消下划线 */
}
.nav-item:hover {
  transform: scale(1.1); /* 放大效果 */
}
.main {
  background-color: beige;
  height: 91.5vh;
  padding: 0 !important;
  /* border: 2px rgb(208, 56, 56) solid; */
}

.item-image {
  width: 10.08vw; /* 设置图片的宽度 */
  height: 7.6vh; /* 设置图片的高度为自动，以保持宽高比 */
}


.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

</style>
