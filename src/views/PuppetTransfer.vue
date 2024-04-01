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
        <video class="puppetImg" :src="outUrl" v-if="outUrl" controls>
        </video>
        <img class="puppetImg" :src=loading v-else-if="loading">
        <img
            class="puppetimage-circle"
            src="@/assets/puppet/frame.png"
            alt="木偶头表情迁移"
        >
      </div>
      <img src="@/assets/puppet/buildbutton.png" class="puppetTag" >
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import {sentPuppet} from "../api/index"

let inputElement = null;
export default {
  name: "PuppetTransfer",
  data() {
    return {
      valueUrl: require("../assets/example/te.mp4"),
				outUrl:require("../assets/example/result.mp4"),
      loading:''
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
      if (
        event &&
        event.target &&
        event.target.files &&
        event.target.files.length > 0
      ) {
        const file = event.target.files[0];
        const isLt20M = file.size / 1024 / 1024 < 10;
        if (!isLt20M) {
          this.$message.error("上传视频大小不能超过 10MB!");
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            // 使用 Axios 将视频发送到后端
            const formData = new FormData();
            formData.append("video", file);
            this.valueUrl = reader.result;
            this.$message({
              message: "视频上传成功，请等待",
              type: "success",
            });
            this.outUrl = ''
            this.loading=require("../assets/loading.gif")
            // console.log(reader.result);
           sentPuppet(formData)
              .then((response) => {
                // 上传成功后的操作
                // console.log('视频上传成功','data:video/mp4;base64,'+response.data.base64_video);

                this.outUrl = "data:video/mp4;base64," + response.data.base64_video;
                // console.log(this.outUrl);
              })
              .catch((error) => {
                // 上传失败后的操作
                console.error("表情迁移失败", error);
                this.$message.error("表情迁移失败");
              });
          };
          reader.readAsDataURL(file);
        }
      }
    },
    // GetGeneratedVideo(){
    //   setTimeout(() => {
    //     this.GeneratedVideo = true;
    //   }, 3000); // 延迟3秒（3000毫秒）后执行
    // }
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
  width:  21.1vw;
  height:  41.87vh;
  overflow: hidden;
  cursor: pointer;

}


.puppetImg {
  display: block;
  width: 11.96vw;
  height: 25.067vh;
  margin-left: 5.44vw;
  margin-top: 12.8vh;
  z-index: 999;
  position: absolute;
  border-radius: 5%;
}
#puppet-v {
  background: url("@/assets/puppet/bg.jpg");
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.puppetimage-circle{
  width: 24.2vw;
  height: 48vh;
}
.puppetTag{
  width: 13.44vw;
  height: 8.26vh;
  cursor: pointer;
  margin-left: 1.8vw;
  margin-top: 1.33vh;
}
.puppetTag:hover {
  transform: scale(1.1); /* 放大效果 */
}
.lead{
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 6.67vh;
}
.build{
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 6.67vh;
}

</style>
