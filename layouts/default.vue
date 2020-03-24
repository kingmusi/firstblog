<template>
  <div class="container">
    <el-row>
      <el-col :span="24"> <Header/> </el-col>
    </el-row>
    
    <el-row class="content-container">
      <el-col :span="15"> <nuxt/></el-col>
      <el-col :span="8" :offset="1"> <rightrow/></el-col>
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
.content-container{
  width:80%;
  margin:0 auto;
}
</style>
