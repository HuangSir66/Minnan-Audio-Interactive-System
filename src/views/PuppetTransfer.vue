<template>
  <div class="puppet" id="puppet-v">
    <div class="lead">
      <div class="puppetImg-div" >
        <video class="puppetImg" :src="valueUrl" v-if="valueUrl" controls>
        </video>
        <img
            class="puppetimage-circle"
            src="@/assets/puppet/frame.png"
            alt="木偶头表情迁移"
        >
      </div>
      <img src="@/assets/puppet/leadbutton.png" class="puppetTag" @click="toGetVideo">
    </div>
    <div class="build">
      <div class="puppetImg-div" >
        <video class="puppetImg" v-if="GeneratedVideo" controls>
          <source src="@/assets/puppet/video/video1.mp4" type="video/mp4">
        </video>
        <img
            class="puppetimage-circle"
            src="@/assets/puppet/frame.png"
            alt="木偶头表情迁移"
        >
      </div>
      <img src="@/assets/puppet/buildbutton.png" class="puppetTag" @click="GetGeneratedVideo">
    </div>
  </div>

</template>

<script>
import axios from 'axios';

let inputElement = null;
export default {
  name: "PuppetTransfer",
  data() {
    return {
      valueUrl: '',
      GeneratedVideo : false
    };
  },
  methods: {
    toGetVideo() {
      if (inputElement === null) {
        inputElement = document.createElement('input');
        inputElement.setAttribute('type', 'file');
        inputElement.setAttribute('accept', 'video/*');
        inputElement.style.display = 'none';

        if (window.addEventListener) {
          inputElement.addEventListener('change', this.uploadVideo, false);
        } else {
          inputElement.attachEvent('onchange', this.uploadVideo);
        }

        document.body.appendChild(inputElement);
      }
      inputElement.click();
    },
    uploadVideo(event) {
      if (event && event.target && event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          // 将视频显示在页面中
          this.valueUrl = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },
    GetGeneratedVideo(){
      setTimeout(() => {
        this.GeneratedVideo = true;
      }, 3000); // 延迟3秒（3000毫秒）后执行
    }
  },
}
</script>

<style scoped>
.puppet {
  overflow: hidden;
  display:flex;
  justify-content: center;
  align-items: flex-start;
}

.puppetImg-div {
  width:  314px;
  height:  314px;
  overflow: hidden;
  cursor: pointer;

}


.puppetImg {
  display: block;
  width: 178px;
  height: 188px;
  margin-left: 81px;
  margin-top: 96px;
  z-index: 999;
  position: absolute;
  border-radius: 5%;
}
#puppet-v {
  background: url("../assets/puppet/bg.jpg");
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.puppetimage-circle{
  width: 360px;
  height: 360px;
}
.puppetTag{
  width: 200px;
  height: 62px;
  cursor: pointer;
  margin-left: 27px;
  margin-top: 10px;
}
.puppetTag:hover {
  transform: scale(1.1); /* 放大效果 */
}
.lead{
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 50px;
}
.build{
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 50px;
}

</style>