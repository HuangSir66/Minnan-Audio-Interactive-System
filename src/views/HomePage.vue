<template>
  <div id="build">
    <div class="carousel-container">
      <ul id="banner">
        <li v-for="(image, index) in images" :key="index"
            @mouseenter="stopAutoSlide" @mouseleave="startAutoSlide"
            :style="{ height: image.height + 'px',left: image.left, opacity: image.opacity, zIndex: image.zIndex,position: 'absolute', top:0,bottom:0,margin:'auto',}">
          <router-link :to="image.to">
            <img :src="image.src" alt="" :style="{  width: '600px', height: image.height + 'px', borderRadius:'1%', boxShadow: '5px 15px 15px #888888'}">
          </router-link>
        </li>
      </ul>
      <img src="@/assets/home/preImg.png" alt="Previous" @click="getPre" class="control-img pre-img">
      <img src="@/assets/home/nexImg.png" alt="Next" @click="getNext" class="control-img nex-img">
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      images: [
        { src: require("@/assets/home/cutPaper.jpg"), to: "/cutpaper", left: "200px", opacity: 1, zIndex:4, height: 300 },
        { src: require("@/assets/home/moveTransfer.jpg"), to: "/movetransfer", left: "300px", opacity: 1, zIndex:3, height: 250 },
        { src: require("@/assets/home/oldImage.jpg"), to: "/oldimgrepair", left: "400px", opacity: 1, zIndex:2, height: 200 },
        { src: require("@/assets/home/clothTransfer.jpg"), to: "/clothingtransfer", left: "120px", opacity: 1, zIndex:3, height: 250 },
        { src: require("@/assets/home/puppetTransfer.jpg"), to: "/puppettransfer", left: "40px", opacity: 1, zIndex:2, height: 200 },
        { src: require("@/assets/home/musicTransfer.jpg"), to: "/musictransfer", left: "0px", opacity: 1, zIndex:1, height: 180 },
      ],
      timer: null,
      currentIndex: 0,
    }
  },
  mounted() {
    this.startAutoSlide();
  },
  methods: {
    startAutoSlide() {
      this.timer = setInterval(this.getNext, 2000);
    },
    stopAutoSlide() {
      clearInterval(this.timer);
    },
    getNext() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.adjustImagesForDisplay();
    },
    getPre() {
      this.currentIndex = this.currentIndex - 1 < 0 ? this.images.length - 1 : this.currentIndex - 1;
      this.adjustImagesForDisplay();
    },
    adjustImagesForDisplay() {
      for (let i = 0; i < this.images.length; i++) {
        if (i === this.currentIndex) {
          this.images[i].left = "200px";
          this.images[i].opacity = 1;
          this.images[i].zIndex = 4;
          this.images[i].height = 300
        } else if (i === (this.currentIndex + 1) % this.images.length || (this.currentIndex === this.images.length - 1 && i === 0)) {
          this.images[i].left = "300px";
          this.images[i].opacity = 1;
          this.images[i].zIndex = 3;
          this.images[i].height = 250
        } else if (i === (this.currentIndex - 1 + this.images.length) % this.images.length || (this.currentIndex === 0 && i === this.images.length - 1)) {
          this.images[i].left = "120px";
          this.images[i].opacity = 1;
          this.images[i].zIndex = 3;
          this.images[i].height = 250
        } else if (i === (this.currentIndex + 2) % this.images.length || (this.currentIndex === this.images.length - 2 && i === 0) || (this.currentIndex === this.images.length - 1 && i === 1)) {
          this.images[i].left = "400px";
          this.images[i].opacity = 1;
          this.images[i].zIndex = 2;
          this.images[i].height = 200
        } else if (i === (this.currentIndex - 2 + this.images.length) % this.images.length || (this.currentIndex === 0 && i === this.images.length - 2) || (this.currentIndex === 1 && i === this.images.length - 1)) {
          this.images[i].left = "40px";
          this.images[i].opacity = 1;
          this.images[i].zIndex = 2;
          this.images[i].height = 200
        }else {
          this.images[i].left = "0px";
          this.images[i].opacity = 1;
          this.images[i].zIndex = 1;
          this.images[i].height = 180
        }
      }
    },
  }
};
</script>

<style scoped>
#build{
  background: url("../assets/home/background.jpg");
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.carousel-container {
  position: relative;
  width: 1000px;
  height: 400px;
  margin: auto;
  overflow: hidden;
}

.control-img {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 100;
}
.control-img:hover{
  cursor: pointer;
}
.pre-img {
  left: 0;
}

.nex-img {
  right: 0;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  position: absolute;
  transition-duration: 0.4s;
}
</style>
