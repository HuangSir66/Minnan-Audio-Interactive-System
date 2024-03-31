<template>
  <div class="clothing" id="clothing-v">
    <div class="leadImg">
      <div class="smallImg-div" @click="toGetImg">
        <img class="smallImg" :src=valueUrl v-if="valueUrl">
        <div class="smallText" v-else>点击上传照片</div>
        <img
            class="smallimage-circle"
            src="@/assets/clothing/buildframe.png"
            alt="闽南剪纸迁移"
        >
      </div>
      <img src="@/assets/clothing/build.png" class="clothingTag" @click="sentImage">
      <div class="allAlothing">
        <div v-for="(dynasty, index) in dynasties" :key="index" class="dynasty">
          <img :src="dynasty.clothingSrc" class="dynastyClothing" :style="{ transform: isSelected(index) ? 'scale(1.1)' : 'scale(1)' }">
          <img :src="dynasty.buttonSrc" class="dynastyButton" @click="selectDynasty(index,dynasty)">
        </div>
      </div>
    </div>
    <div class="buildImg">
      <div class="clothingImg-div" >
        <!-- <img class="bigImg" :src=valueUrl v-if="valueUrl"> -->
        <img class="clothingImg" :src=outUrl v-if="outUrl" @click="downloadImage">
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
import {sentClothImg} from "../api/index";
let inputElement = null
export default {
  data() {
    return {
      valueUrl: '',
      outUrl:'',
      isImg: false,  // 控制加载动画显示与隐藏
      style: "",
      selectedDynasty: null,
      dynasties: [
        { clothingSrc: require("@/assets/clothing/hanclothing.png"), buttonSrc: require("@/assets/clothing/han.png"),dynasties:'han_1' },
        { clothingSrc: require("@/assets/clothing/tangclothing.png"), buttonSrc: require("@/assets/clothing/tang.png"),dynasties:'tang_2' },
        { clothingSrc: require("@/assets/clothing/songclothing.png"), buttonSrc: require("@/assets/clothing/song.png"),dynasties:'song_1'  },
        { clothingSrc: require("@/assets/clothing/mingclothing.png"), buttonSrc: require("@/assets/clothing/ming.png"),dynasties:'ming_1'  }
      ]
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
        const files = el.target.files[0];
        const isLt2M = files.size / 1024 / 1024 < 2;

        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        } else if (files.type.indexOf('image') === -1) {
          this.$message.error('请选择图片文件');
        } else {
          const reader = new FileReader();
          reader.readAsDataURL(files);
          reader.onload = () => {
            this.valueUrl = reader.result;
            
          };
          
        }
      }
    },
    sentImage(){
      if (!this.valueUrl) {
        this.$message.error('请先上传图片');
        return;
      }
      if(this.style==''){
        this.$message.error('请先选择朝代');
      }else{
          this.$message({
                message: '图片上传成功,正在生成',
                type: 'success'
          });
         this.outUrl=require("../assets/loading.gif")
         sentClothImg({ 
          image: this.valueUrl.split(',')[1],
          style: this.style
        })
        .then(response => {
          this.isImg = true
          const stylizedImage = response.data.stylized_image;
          this.outUrl = 'data:image/jpeg;base64,' + stylizedImage;
        })
        .catch(error => {
          this.loading = false;
          console.error('Error uploading image: ', error);
        });
      }
      
          
    },
    selectDynasty(index,dynasties) {
      this.selectedDynasty = index;
      this.style = dynasties.dynasties
    },
    isSelected(index) {
      return this.selectedDynasty === index;
    },
    downloadImage(event) {
      if (this.isImg) {
        const link = document.createElement('a');
        link.href = this.outUrl;
        link.download = 'stylized_image.jpg'; // 设置下载后的文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if(!this.valueUrl){
        this.$message.error('请先上传图片');
      }else{
        this.$message.error('正在加载中');
        event.preventDefault();  
        event.stopPropagation();  
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
  background: url("@/assets/clothing/bg2.jpg");
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
  margin-right: 0px;
}
.buildImg{
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-right: 380px;
  margin-top: 10px;
}
.smallText{
  display: block;
  margin-left: 136px;
  margin-top: 156px;
  z-index: 999;
  color: #b1abab;
  position: absolute;
}

</style>

