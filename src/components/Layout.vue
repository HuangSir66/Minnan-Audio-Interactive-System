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
            style=" width: 170px; height: auto;"
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
          to="/MoveTransform"
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
          to="/xiq-qu-dongzuo-qianyi"
          style="color: inherit; text-decoration: none;"
        >
        <img
            class="item-image"
            src="@/assets/operaTransfer.png"
            alt="戏曲动作迁移"
          >
        </router-link>
      </div>
    </el-header>
    <el-main
      class="main"
      id="building"
    >
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
export default {};
</script>

<style>
.full-height {
  height: 100vh; /* 设置容器的高度为100vh */
}
.header {
  background-color: antiquewhite;
  height: 10vh;
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
  padding: 10px; /* 调整导航键之间的间距 */
  transition: all 0.3s ease; /* 添加过渡效果 */
  color: inherit; /* 继承父元素的字体颜色 */
  text-decoration: none; /* 取消下划线 */
}
.nav-item:hover {
  transform: scale(1.1); /* 放大效果 */

}
.main {
  background-color: beige;
  height: 90vh;
  padding: 0 !important;
  /* border: 2px rgb(208, 56, 56) solid; */
}

.item-image {
  width: 150px; /* 设置图片的宽度 */
  height: auto; /* 设置图片的高度为自动，以保持宽高比 */
}
</style>
