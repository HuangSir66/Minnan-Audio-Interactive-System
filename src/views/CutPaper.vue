<template>
	<div class="alert-box-item" id="building-v">
        <div class="qianImg">
            <div class="bigImg-div" @click="toGetImg">
                <img class="bigImg" :src=valueUrl v-if="valueUrl">
                <div class="smallText2" v-else>点击上传照片</div>
                <img
                    class="image-circle"
                    src="@/assets/liubianxing.png"
                    alt="闽南剪纸迁移"
                >
            </div>
            <img src="@/assets/qianyiqian.png" class="tag" @click="toGetImg">
        </div>
        <div class="houImg">
            <div class="bigImg-div" >
                <!-- <img class="bigImg" :src=valueUrl v-if="valueUrl"> -->
                <img class="bigImg" :src=outUrl v-if="outUrl">
                <img
                    class="image-circle"
                    src="@/assets/liubianxing.png"
                    alt="闽南剪纸迁移"
                >
            </div>
            <img src="@/assets/qianyihou.png" class="tag" @click="downloadImage" >
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
                valueUrl: require("../assets/example/flower.jpg"),
				        outUrl:require("../assets/example/flowerExample.jpg"),
                isimg:false
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
                        const that = this;
                        const reader = new FileReader(); // 创建读取文件对象
                        reader.readAsDataURL(el.target.files[0]); // 发起异步请求，读取文件
                        this.$message({
                                message: '图片上传成功',
                                type: 'success'
                            });
                        this.outUrl=require("../assets/loading.gif")
                        reader.onload = function() { // 文件读取完成后
                            // 读取完成后，将结果赋值给img的src
                            that.valueUrl = this.result;
                            console.log(this.result,"result");

                            // 使用axios发送POST请求到后端
                            sentBasePic({ image: reader.result.split(',')[1] })
                                .then(response => {
                                    // 处理后的base64编码图片数据
                                    this.isimg=false;
                                    const stylizedImage = response.data.stylized_image;
                                    // 更新显示处理后的图片
                                    that.outUrl = 'data:image/jpeg;base64,' + stylizedImage;
                                })
                                .catch(error => {
                                    this.loading=false;
                                    console.error('Error uploading image: ', error);
                                    this.$message.error('风格迁移失败');
                                });
                        };
                    }
                }
            },
            downloadImage(event) {
                if (this.outUrl&&this.outUrl!= require("../assets/loading.gif")) {
                    const link = document.createElement('a');
                    link.href = this.outUrl;
                    link.download = 'stylized_image.jpg'; // 设置下载后的文件名
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else if(this.valueUrl==""){
                    this.$message.error('请先上传图片');
                    // 如果图片被禁用，阻止点击事件的默认行为
                }else{
                    this.$message.error('正在加载中');
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


<style >
	.alert-box-item {
		overflow: hidden;
        display:flex;
        justify-content: flex-end;
        align-items: flex-start;
	}

	.bigImg-div {
		width:  25vw;
		height:  45vh;
		border-radius: 100%;
		overflow: hidden;
		/* border: 10px rgb(208, 56, 56) double; */
        cursor: pointer;


	}

    /* .chose-style {
        margin-left: 450px;
        margin-top: 20px;
		width: 400px;
		height: 200px;
		border-radius: 10%;
		overflow: hidden;
		border: 10px rgb(208, 56, 56) double;
	} */

	.bigImg {
		display: block;
		width: 18vw;
		height: 34.5vh;
		border-radius: 100%;
        margin-left: 3.4vw;
        margin-top: 6vh;
        z-index: 999;
        position: absolute;
        transition: filter 0.3s;
	}
    #building-v {
        background: url("../assets/paperTranBackground.jpg");
        width: 100%;
        height: 100%;
        background-size: 100% 100%;
    }
    .image-circle{
        width: 25vw;
        height: 45vh;
    }
    .tag{
        width: 17vw;
        height: 10vh;
        cursor: pointer;
    }
    .tag:hover {
        transform: scale(1.1); /* 放大效果 */
    }
    .qianImg{
        display:flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
    .houImg{
        display:flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin-right: 17vw;
    }
   .smallText2{
     display: block;
     margin-left: 9vw;
     margin-top: 24vh;
     z-index: 998;
     color: #8b8989;
     position: absolute;
     font-size: 1vw;
    }
</style>

