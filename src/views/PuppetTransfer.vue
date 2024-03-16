<template>
  <div class="puppet" id="puppet-v">
    <div class="lead">
      <div class="puppetImg-div" @click="toGetImg">
        <img class="puppetImg" :src=valueUrl v-if="valueUrl">
        <img
            class="puppetimage-circle"
            src="@/assets/puppet/frame.png"
            alt="闽南剪纸迁移"
        >
      </div>
      <img src="@/assets/puppet/leadbutton.png" class="puppetTag" @click="toGetImg">
    </div>
    <div class="build">
      <div class="puppetImg-div" >
        <img class="puppetImg" :src=outUrl v-if="outUrl">
        <img
            class="puppetimage-circle"
            src="@/assets/puppet/frame.png"
            alt="闽南剪纸迁移"
        >
      </div>
      <img src="@/assets/puppet/buildbutton.png" class="puppetTag" @click="downloadImage">
    </div>
  </div>

</template>

<script>
export default {
  name: "PuppetTransfer"
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
  width:  295px;
  height:  314px;
  overflow: hidden;
  cursor: pointer;

}


.puppetImg {
  display: block;
  width: 273px;
  height: 273px;
  margin-left: 52px;
  margin-top: 49px;
  z-index: 999;
  position: absolute;
}
#puppet-v {
  background: url("../assets/puppet/bg.jpg");
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.puppetimage-circle{
  width: 304px;
  height: auto;
}
.puppetTag{
  width: 200px;
  height: 62px;
  cursor: pointer;
}
.puppetTag:hover {
  transform: scale(1.1); /* 放大效果 */
}
.lead{
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 80px;
}
.build{
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 80px;
}

</style>