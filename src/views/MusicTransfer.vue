<template>
  <div id="music-background" class="container">
    <img
          class="circle-div"
          src="@/assets/halfcircle.png"
          alt="半圆拱门"
          @click="toGetImg"
    >
    <audio ref="audioPlayer" controls style="opacity: 0.8;"></audio>
    <!-- <button @click="uploadData" style="border-radius:100%">上传音频及文字</button> -->
    <img
          class="item-button"
          src="@/assets/shengcheng.png"
          alt="生成按钮"
          @click="uploadData"
    >
    <div style="flex:1"></div>
    <div class='chose-music'>
        <img
          class="item-music"
          src="@/assets/pipa.png"
          alt="琵琶"
        >
        <img
          class="item-music"
          style="width:12vw"
          src="@/assets/piano.png"
          alt="琴"
        >
        <img
          class="item-music"
          src="@/assets/violin.png"
          alt="小琴"
        >
        <img
          class="item-music"
          src="@/assets/flute.png"
          alt="笛子"
        >
    </div>
  </div>
</template>

<script>
import {sentMusic} from "../api/index"
let inputElement = null
export default {
  data(){
    return{
      audioFile:'',
      isMusic:false
    }
  },
  methods: {
    toGetImg() {
          if (inputElement === null) {
          // 生成文件上传的控件
            inputElement = document.createElement('input')
            inputElement.setAttribute('type', 'file')
            inputElement.style.display = 'none'

            if (window.addEventListener) {
              inputElement.addEventListener('change', this.handleFileChange, false)
            } else {
              inputElement.attachEvent('onchange', this.handleFileChange)
            }

            document.body.appendChild(inputElement)
          }
          inputElement.click()
    },
    handleFileChange(event) {
          this.audioFile = event.target.files[0];
          if (!this.audioFile) return;
          // 检查文件大小，限制为最大10MB
          if (this.audioFile.size > 20 * 1024 * 1024) {
            this.$message.error('文件大小不能超过20MB');
            return;
          }

          // 检查文件类型，限制为 mp3 格式
          // 检查文件类型，限制为音频文件
          if (!this.audioFile.type.startsWith('audio/')) {
            this.$message.error('请先选择音频文件');
            return;
          }

          // 创建一个 URL 对象，用于在客户端加载文件
          const audioUrl = URL.createObjectURL(this.audioFile);

          // 设置音频播放器的 src 属性为 URL 对象的值，并播放音频文件
          this.$refs.audioPlayer.src = audioUrl;
          this.$message({
            message: '音乐上传成功',
            type: 'success'
          });
          // this.$refs.audioPlayer.play();
    },
    uploadData() {
      if (!this.audioFile) {
        this.$message.error('请先选择音频文件');
        return;
      }else if(this.isMusic==false){
        this.$message.error('加载中，请等待');
        return
      }



      // 创建一个 FormData 对象，用于将文件上传到后端
      const formData = new FormData();
      formData.append('file', this.audioFile);

      // 添加文字数据到 FormData 对象中
      formData.append('text', '这是一串文字数据');
      this.$message({
          message: '正在迁移，请等待',
          type: 'success'
        });

      // 使用 Axios 发送 POST 请求上传文件和文字数据
      // 在axios的POST请求.then()中处理后端发送过来的mp3文件
      sentMusic(formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        // 设置 responseType 为 'blob'，以便接收文件数据
      })
      .then(response => {
        this.$message({
          message: '音乐迁移成功',
          type: 'success'
        });
        // console.log('Response data type:', typeof response.data);
        // console.log(response)
        this.isMusic=true;
        // 创建一个 Blob 对象，并使用 URL.createObjectURL 方法创建一个临时 URL
        const blob = new Blob([response.data], { type: 'audio/mpeg' });
        const url = window.URL.createObjectURL(blob);
        this.$refs.audioPlayer.src = url;
        // this.$refs.audioPlayer.play();
      })
      .catch(error => {
        console.error('上传文件出错:', error);
        this.$message.error('音乐迁移出错');

      });

    }

  },
  beforeDestroy() {
    if (inputElement) {
        if (window.addEventListener) {
            inputElement.removeEventListener('change', this.onGetLocalFile, false)
        } else {
            inputElement.detachEvent('onchange', this.onGetLocalFile)
        }
        document.body.removeChild(inputElement)
        inputElement = null
        console.log('========inputelement destroy')
    }
  }

}
</script>

<style>
.container{
  display: flex;
  flex-direction: column;
	justify-content: flex-start;
	align-items: center;
}
#music-background{
  background: url("@/assets/musicTransferBackground.jpg");
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.circle-div{
  margin-top:2.67vh ;
  width: 33.6vw;
  height: 35.5vh;
  cursor: pointer;
}
.chose-music{
  display: flex;
  justify-content: space-around;
}
.item-button{
  width: 10.08vw;
  height: 6.13vh;
  cursor: pointer;
}
.item-button:hover{
  transform: scale(1.1); /* 放大效果 */
}
.item-music{
  width: 6.7vw;
  height: 26.6vh;
  cursor: pointer;
  margin-right: 1vw;
  margin-bottom: 4.6vh;

}
.item-music:hover {
  transform: scale(1.1); /* 放大效果 */
}
</style>
