<template>
  <div class="container">
    <el-row>
      <el-col :span="24"> <Header/> </el-col>
    </el-row>
    
    <el-row class="content-container">
      <el-col :span="15" class="box-container"> <nuxt/></el-col>
      <el-col :span="8" :offset="1" class="rightrow-container"> <rightrow/></el-col>
    </el-row>
  </div>
</template>

<script>
import Header from '@/components/public/header/index.vue'
import rightrow from '@/components/public/rightrow/index.vue'

export default {
  components: {
    Header,
    rightrow
  }
}
</script>

<style>
@media screen and (max-width: 750px) {
  .rightrow-container{
    display:none;
  }

  .box-container{
    width:100%;
  }
}

.content-container{
  width:80%;
  margin:0 auto;
}
</style>
