<template>
  <div id="music-background" class="container">
    <img
          class="circle-div"
          src="@/assets/halfcircle.png"
          alt="半圆拱门"
          @click="toGetImg"
    >
    <audio ref="audioPlayer" controls style="opacity: 0.8;"></audio>
    <button @click="uploadData" style="border-radius:100%">上传音频及文字</button>
    <div style="flex:1"></div>
    <div class='chose-music'>
        <img
          class="item-music"
          src="@/assets/pipa.png"
          alt="琵琶"
        >
        <img
          class="item-music"
          style="width:230px"
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
import axios from 'axios';

let inputElement = null
export default {
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
            alert('文件大小不能超过20MB');
            return;
          }

          // 检查文件类型，限制为 mp3 格式
          // 检查文件类型，限制为音频文件
          if (!this.audioFile.type.startsWith('audio/')) {
            alert('请选择一个音频文件');
            return;
          }

          // 创建一个 URL 对象，用于在客户端加载文件
          const audioUrl = URL.createObjectURL(this.audioFile);

          // 设置音频播放器的 src 属性为 URL 对象的值，并播放音频文件
          this.$refs.audioPlayer.src = audioUrl;
          this.$refs.audioPlayer.play();
    },
    uploadData() {
      if (!this.audioFile) {
        alert('请先选择音频文件');
        return;
      }

      // 创建一个 FormData 对象，用于将文件上传到后端
      const formData = new FormData();
      formData.append('file', this.audioFile);

      // 添加文字数据到 FormData 对象中
      formData.append('text', '这是一串文字数据');

      // 使用 Axios 发送 POST 请求上传文件和文字数据
      axios.post('http://localhost:8000/api/stylizer/music/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        alert('文件和文字数据上传成功');
        console.log(response.data.midi_url);
        this.$refs.audioPlayer.src = 'http://localhost:8000/'+response.data.midi_url;
        // 可以在这里处理后端返回的数据
      })
      .catch(error => {
        console.error('上传文件出错:', error);
        alert('上传文件出错');
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
  background: url("../assets/musicTransferBackground.jpg");
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.circle-div{
  margin-top:20px ;
  width: 500px;
  height: auto;
  cursor: pointer;
}
.chose-music{
  display: flex;
  justify-content: space-around;
}
.item-music{
  width: 150px;
  height: auto;
  cursor: pointer;
  margin-right: 15px;
  
}
.item-music:hover {
  transform: scale(1.1); /* 放大效果 */
}
</style>
