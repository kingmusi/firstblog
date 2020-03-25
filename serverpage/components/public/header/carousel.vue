<template>
    <el-carousel 
        :interval="2000" 
        type="card" 
        height="300px"
    >
    <el-carousel-item v-for="(item,index) of imgs" :key="index">
      <a href="#"><img :src="item"></a>
    </el-carousel-item>
  </el-carousel> 
</template>

<script>
export default {
    data(){
        return {
            imgs: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574189479862&di=5f19978d3212f1a5f041373b71f0546e&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201504%2F28%2F20150428212640_vLBGX.thumb.700_0.jpeg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574189529164&di=aea3f15346d4a88ed1d5c4c235db2fb5&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201606%2F14%2F20160614010026_ZAX42.jpeg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574189576966&di=1cff2d0a58a30298795fe6c14f9d9169&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180823%2Faaf8531b5735406ca6aa164878bb85e2.jpeg'
            ]
        }
    }
}
</script>

<style scoped>
</style>