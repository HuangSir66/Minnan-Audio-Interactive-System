<template>
  <div>
    <div class="bottomm"></div>
    <div class="Swiper">
      <div class="Swiper-content">
        <div class="Swiper-item" v-for="(item, index) in imageUrl" :key="index">
          <img :src="item" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper } from "@/swiper/Swiper";
export default {
  name: "Swiper",
  data() {
    return {
      imageUrl: [
        require("../assets/0.jpg"),
        require("../assets/1.jpg"),
        require("../assets/2.jpg"),
        require("../assets/3.jpg"),
        require("../assets/4.jpg"),
        require("../assets/5.jpg"),

      ],
      classList: ["one", "two", "three", "four", "five"],
    };
  },
  methods: {
    swiper() {
      new Swiper({
        classList: this.classList,
        SwiperContent: ".swiper-content",
      });
    },
  },

  mounted() {
    this.swiper();
  },
};
</script>


<style scoped>
.titelText {
  position: absolute;
  font-size: 50px;
  width: 100%;
  top: 20px;
  text-align: center;
  font-family: "YouYuan";
  letter-spacing: 8px;
  color:white;
  text-shadow: 0 0 0px #fff, 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #00ffea,
  0 0 20px #00ffd5, 0 0 30px #00eeff, 0 0 40px #00ffff, 0 0 50px #00fff2;
}
.bottomm{
  height:150px;
  width:100%;
  position:absolute;
  bottom:0;

  left:0;
  right:0;
  background-size:100%;
  background-repeat:no-repeat;
  border-top:30px solid rgba(20, 20, 20, 0.5);
  box-shadow: 0 0 10px rgb(255, 243, 187);
}
.Swiper {
  height: 250px;
  width: 100%;
  position: relative;
  margin: 150px auto;
}

.Swiper-content {
  height: 100%;
  width: 50%;
  position: relative;
  margin: 0 auto;
  left:15px

}

.Swiper-content div {
  position: absolute;
  height: 150px;
  width: 120px;
  margin-top: 50px;
  transition: all 0.6s;
}
.Swiper-content img {
  height: 100%;
  width: 100%;
}
.one {
  z-index: 1;
  transform: scale(0.8);
  left: 75px;
  box-shadow: -3px 4px 10px 1px rgba(0, 0, 0, 0.2);
}
.two {
  z-index: 2;
  transform: scale(0.9);
  left: 175px;
  box-shadow: -3px 4px 10px 1px rgba(0, 0, 0, 0.2);
}

.three {
  z-index: 9;
  transform: scale(1);
  left: 275px;
  box-shadow: -3px 4px 10px 1px rgba(0, 0, 0, 0.2);
}
.four {
  z-index: 2;
  transform: scale(0.9);
  left: 375px;
  box-shadow: 3px 4px 10px 1px rgba(0, 0, 0, 0.2);
}

.five {
  z-index: 1;
  transform: scale(0.8);
  left: 475px;
  box-shadow: 3px 4px 10px 1px rgba(0, 0, 0, 0.2);
}
</style>