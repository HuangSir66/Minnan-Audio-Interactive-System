<template>
  <div class="clothing" id="clothing-v">
    <div class="leadImg">
      <div class="smallImg-div" @click="toGetImg">
        <img class="smallImg" :src=valueUrl v-if="valueUrl">
        <img
            class="smallimage-circle"
            src="@/assets/clothing/buildframe.png"
            alt="闽南剪纸迁移"
        >
      </div>
      <img src="@/assets/clothing/build.png" class="clothingTag" @click="toGetImg">
      <div class="allAlothing">
        <div class="dynasty">
          <img src="@/assets/clothing/hanclothing.png" class="dynastyClothing">
          <img src="@/assets/clothing/han.png" class="dynastyButton">
        </div>
        <div class="dynasty">
          <img src="@/assets/clothing/tangclothing.png" class="dynastyClothing">
          <img src="@/assets/clothing/tang.png" class="dynastyButton">
        </div>
        <div class="dynasty">
          <img src="@/assets/clothing/songclothing.png" class="dynastyClothing">
          <img src="@/assets/clothing/song.png" class="dynastyButton">
        </div>
        <div class="dynasty">
          <img src="@/assets/clothing/mingclothing.png" class="dynastyClothing">
          <img src="@/assets/clothing/ming.png" class="dynastyButton">
        </div>
      </div>
    </div>
    <div class="buildImg">
      <div class="clothingImg-div" >
        <!-- <img class="bigImg" :src=valueUrl v-if="valueUrl"> -->
        <img class="clothingImg" :src=outUrl v-if="outUrl">
        <img
            class="clothingimage-circle"
            src="@/assets/clothing/buildframe.png"
            alt="闽南剪纸迁移"
        >
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import {sentBasePic} from "../api/papercut";
let inputElement = null
export default {
  data() {
    return {
      valueUrl: '',
      outUrl:'',
      loading: false  // 控制加载动画显示与隐藏
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
          inputElement.addEventListener('change', this.uploadFile, false)
        } else {
          inputElement.attachEvent('onchange', this.uploadFile)
        }

        document.body.appendChild(inputElement)
      }
      inputElement.click()
    },
    uploadFile(el) {
      if (el && el.target && el.target.files && el.target.files.length > 0) {
        console.log(el)
        const files = el.target.files[0]
        const isLt2M = files.size / 1024 / 1024 < 2
        const size = files.size / 1024 / 1024
        console.log(size,'result')
        // 判断上传文件的大小
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!')
        } else if (files.type.indexOf('image') === -1) { //如果不是图片格式
          // this.$dialog.toast({ mes: '请选择图片文件' });
          this.$message.error('请选择图片文件');
        } else {
          this.loading = true;
          const that = this;
          const reader = new FileReader(); // 创建读取文件对象
          reader.readAsDataURL(el.target.files[0]); // 发起异步请求，读取文件
          reader.onload = function() { // 文件读取完成后
            // 读取完成后，将结果赋值给img的src
            that.valueUrl = this.result;
            that.outUrl = this.result;
            console.log(this.result,"result");
            // 使用axios发送POST请求到后端
            sentBasePic({ image: reader.result.split(',')[1] })
                .then(response => {
                  // 处理后的base64编码图片数据
                  this.loading=false;
                  const stylizedImage = response.data.stylized_image;
                  // 更新显示处理后的图片
                  that.outUrl = 'data:image/jpeg;base64,' + stylizedImage;
                })
                .catch(error => {
                  this.loading=false;
                  console.error('Error uploading image: ', error);
                });
          };
        }
      }
    },
    downloadImage() {
      if (this.outUrl) {
        const link = document.createElement('a');
        link.href = this.outUrl;
        link.download = 'stylized_image.jpg'; // 设置下载后的文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        this.$message.error('请先上传图片');
      }
    },

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


<style scoped>
.allAlothing{
  display: flex;
  justify-content: center;
  align-items: center;
}
.dynasty{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.dynastyClothing{
  margin-top: 10px;
  width: 130px;
  height: 140px;
}
.dynastyButton{
  margin-top: 10px;
  width: 120px;
  height: auto;
  cursor: pointer;
}
.dynastyButton:hover{
  transform: scale(1.1); /* 放大效果 */

}
.clothing {
  overflow: hidden;
  display:flex;
  justify-content: flex-end;
  align-items: flex-start;
}

.clothingImg-div {
  width:  320px;
  height:  500px;
  overflow: hidden;
  cursor: pointer;

}
.smallImg-div {
  width:  380px;
  height:  365px;
  overflow: hidden;
  cursor: pointer;

}
.smallImg {
  display: block;
  width: 260px;
  height: 300px;
  margin-left: 56px;
  margin-top: 36px;
  z-index: 999;
  position: absolute;
  border-radius: 10%;
}
.smallimage-circle{
  width: 380px;
  height: 365px;
}

.clothingImg {
  display: block;
  width: 245px;
  height: 371px;
  margin-left: 48px;
  margin-top: 61px;
  z-index: 999;
  position: absolute;
  border-radius: 5%;
}
#clothing-v {
  background: url("../assets/clothing/bg.jpg");
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.clothingimage-circle{
  width: 350px;
  height: 485px;
}
.clothingTag{
  width: 200px;
  height: 61px;
  cursor: pointer;
  margin-right: 10px;
}
.clothingTag:hover {
  transform: scale(1.1); /* 放大效果 */
}
.leadImg{
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  margin-right: 50px;
}
.buildImg{
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-right: 315px;
  margin-top: 10px;
}

</style>

