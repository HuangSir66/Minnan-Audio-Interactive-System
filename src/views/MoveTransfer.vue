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
            this.$message({
              message: "视频上传成功，请等待",
              type: "success",
            });
            axios
              .post("http://localhost:8000/api/stylizer/vidio", formData)
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
                this.$message.error("视频上传失败");
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
        this.$message.error('正在上传中');
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
  background: url("../assets/moveTransferBackground.jpg");
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
  margin-top: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.bigImg-div-v {
  width: 292px;
  height: 209px;
  border-radius: 0%;
  margin-left: 5px;
  margin-top: 96px;
  overflow: hidden;
  border: 1px solid #ddd;
  position: absolute;
  z-index: 999;
  cursor: pointer;
}

.bigImg-v {
  display: block;
  width: 349px;
  height: 250px;
  margin: 0px;
}
.image-yichuhaoxi {
  width: 400px;
  height: auto;
}
.image-button{
  width: 200px;
  height: auto;
  cursor: pointer;
}
.image-button:hover{
  transform: scale(1.1); /* 放大效果 */
}
</style>
