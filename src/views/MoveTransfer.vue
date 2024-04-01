<template>
  <div
    class="center-container-v"
    id='building-e'
  >
    <div class="alert-box-item-v">
      <div
        class="bigImg-div-v"
        @click="toGetVideo"
      >
        <video
          class="bigImg-v"
          :src="valueUrl"
          v-if="valueUrl"
          controls
        ></video>
        <div class="smallText1" v-else>点击上传视频</div>
      </div>
      <img
        class="image-yichuhaoxi"
        src="@/assets/yichuhaoxi.png"
        alt="一出好戏"
      >
      <img
        class="image-button"
        src="@/assets/downloadF.png"
        alt="下载按钮"
        @click="downloadvidio"
      >
    </div>

  </div>
</template>

<script>
import axios from "axios";
import {sentBaseVio} from '@/api/index'
let inputElement = null;
export default {
  data() {
    return {
      valueUrl: "",
      ourUrl:''
    };
  },
  methods: {
    toGetVideo() {
      if (inputElement === null) {
        inputElement = document.createElement("input");
        inputElement.setAttribute("type", "file");
        inputElement.setAttribute("accept", "video/*");
        inputElement.style.display = "none";

        if (window.addEventListener) {
          inputElement.addEventListener("change", this.uploadVideo, false);
        } else {
          inputElement.attachEvent("onchange", this.uploadVideo);
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
            // this.$message({
            //   message: "视频上传成功，请等待",
            //   type: "success",
            // });
            sentBaseVio(formData)
              .then((response) => {
                // 上传成功后的操作
                // console.log('视频上传成功','data:video/mp4;base64,'+response.data.base64_video);
                this.valueUrl =
                  "data:video/mp4;base64," + response.data.base64_video;
                this.ourUrl = "ture"
              })
              .catch((error) => {
                // 上传失败后的操作
                console.error("视频上传失败", error);
                this.$message.error("视频迁移失败");
              });
          };
          reader.readAsDataURL(file);
        }
      }
    },
    downloadvidio() {
      if (this.ourUrl) {
        const link = document.createElement("a");
        link.href = this.valueUrl;
        link.download = "stylized_video.mp4"; // 设置下载后的文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }else if(this.valueUrl==''){
        this.$message.error('请上传视频');
      }else if(this.ourUrl==''){
        this.$message.error('正在加载中');
      }
    },
  },
  beforeDestroy() {
    if (inputElement) {
      if (window.addEventListener) {
        inputElement.removeEventListener("change", this.uploadVideo, false);
      } else {
        inputElement.detachEvent("onchange", this.uploadVideo);
      }
      document.body.removeChild(inputElement);
      inputElement = null;
    }
  },
};
</script>


<style>
#building-e {
  background: url("@/assets/moveTransferBackground.jpg");
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.center-container-v {
  display: flex;
  justify-content: center;
  height: 90vh;
}

.alert-box-item-v {
  margin-top: 2.6vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.bigImg-div-v {
  width: 19.6vw;
  height: 27.9vh;
  border-radius: 0%;
  margin-left: 0.33vw;
  margin-top: 12.8vh;
  overflow: hidden;
  position: absolute;
  z-index: 999;
  cursor: pointer;
}

.bigImg-v {
  display: block;
  width: 23.45vw;
  height: 33.3vh;
  margin: 0;
}
.image-yichuhaoxi {
  width: 26.88vw;
  height: 42.9vh;
}
.image-button{
  width: 13.44vw;
  height: 8.27vh;
  cursor: pointer;
}
.image-button:hover{
  transform: scale(1.1); /* 放大效果 */
}
.smallText1{
  display: block;
  margin-left: 6.45vw;
  margin-top: 11vh;
  z-index: 999;
  color: #b1abab;
  position: absolute;
}
</style>
