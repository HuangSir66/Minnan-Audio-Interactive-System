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

let inputElement = null;
export default {
  name: "PuppetTransfer",
  data() {
    return {
      valueUrl: '',
      outUrl:''
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
            // console.log(reader.result);
            axios
              .post("http://localhost:8000/api/stylizer/puppet/", formData)
              .then((response) => {
                // 上传成功后的操作
                // console.log('视频上传成功','data:video/mp4;base64,'+response.data.base64_video);
                
                this.outUrl = "data:video/mp4;base64," + response.data.base64_video;
                console.log(this.outUrl);
              })
              .catch((error) => {
                // 上传失败后的操作
                console.error("视频上传失败", error);
                this.$message.error("视频上传失败");
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