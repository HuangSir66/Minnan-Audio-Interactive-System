<template>
<div class="container" id='background-old-img'>
	<div class="imgall">
		<div class="div-bigImg" @click="toGetImg">
		<img class="Imgbig1" :src=valueUrl v-if="valueUrl">
		<div class="smallText" v-else>点击上传照片</div>
		<img class="Imgbig2" :src=outUrl v-if="outUrl">
		<img
				class="image-book"
				src="@/assets/book.png"
				alt="背景书"
		>
		</div>
		<img
			class="image-old-button"
			src="@/assets/download.png"
			alt="下载按钮"
			@click="downloadImage"
		>
	</div>
</div>

</template>

<script>
import axios from 'axios'
import {sentBaseOld} from '@/api/index'
	let inputElement = null
	export default {
		data() {
			return {
				valueUrl: require("../assets/example/man.png"),
				outUrl:require("../assets/example/manExample.png"),
				isvideo:false
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
					console.log(size)
					// 判断上传文件的大小
					if (!isLt2M) {
						this.$message.error('上传头像图片大小不能超过 2MB!')
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
						this.isvideo=false
						this.outUrl=require("../assets/loading.gif")
						reader.onload = function() { // 文件读取完成后
							// 读取完成后，将结果赋值给img的src
							that.valueUrl = this.result;
							const img = new Image();
							img.src = reader.result;
							img.onload = () => {
								// console.log(this.result);
								sentBaseOld({ 
									image: reader.result.split(',')[1],
									})
									.then(response => {
										// 处理后的base64编码图片数据
										this.isvideo=true
										const stylizedImage = response.data.stylized_image;
										// 更新显示处理后的图片
										that.outUrl = 'data:image/jpeg;base64,' + stylizedImage;
									})
									.catch(error => {
										this.loading=false;
										console.error('Error uploading image: ', error);
									});
							};
							
						};
					}
				}
			},
			downloadImage(event){
				if (this.outUrl&&this.outUrl!= require("../assets/loading.gif")) {
                    const link = document.createElement('a');
                    link.href = this.outUrl;
                    link.download = 'stylized_image.jpg'; // 设置下载后的文件名
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else if(this.valueUrl=='') {
                    this.$message.error('请先上传图片');
            	} else if(this.isvideo==false){
					this.$message.error('系统加载中');
                    // 如果图片被禁用，阻止点击事件的默认行为  
				}
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
.container {
	overflow: hidden;
	display:flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
}
.imgall{
	display:flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-end;
	margin-top: 30px;
}
.div-bigImg {
	width: 500px;
	height: 300px;
	border-radius: 0%;
	overflow: hidden;
	/* border: 1px solid #ddd; */
	display: flex; /* 将子元素设置为 flex 布局 */
	flex-wrap: nowrap; /* 防止子元素换行 */
	cursor: pointer;
}

.Imgbig1 {
	display: block;
	width: 216px;
	height: 249px;
	border-radius: 5%;
	margin-left: 27px;
	margin-top: 21px;
	position: absolute;
	z-index: 999;
	
	
}
.Imgbig2 {
	display: block;
	width: 216px;
	height: 249px;
	border-radius: 5%;
	margin-left: 265px;
	margin-top: 21px;
	z-index: 999;
	position: absolute;
}
.image-book{
	width: 500px;
	height: auto;
}
.image-old-button{
	width: 200px;
	height: 100px;
	cursor: pointer;
}
.image-old-button:hover{
        transform: scale(1.1); /* 放大效果 */
}
#background-old-img{
	background: url("../assets/oldImgBackground.jpg");
	width: 100%;
	height: 100%;
	background-size: 100% 100%;
}
.smallText{
  display: block;
  margin-left: 82px;
  margin-top: 129px;
  z-index: 999;
  color: #b1abab;
  position: absolute;
}
</style>

