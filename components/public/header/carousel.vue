<template>
    <el-carousel 
        :interval="2000" 
        type="card" 
        height="300px"
    >
    <el-carousel-item v-for="(item,index) of imgs" :key="index">
        <a :href="item.id == '#' ? '/' : `/blog?id=${item.id}`"><img :src="item.img"></a>
        <div class="title">{{item.title}}</div>
    </el-carousel-item>
  </el-carousel> 
</template>

<script>
export default {
    data(){
        return {
            imgs: []
        }
    },
    async mounted(){
        const {status, data: {code, list}} = await this.$axios.get('/blog/getCarousel')
        if(status === 200 && code === 0){
            const len = list.length
            if(len == 2){
                list.push({
                    id: '#',
                    img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574189479862&di=5f19978d3212f1a5f041373b71f0546e&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201504%2F28%2F20150428212640_vLBGX.thumb.700_0.jpeg',
                    title: ''
                })
            }else if(len == 1){
                list.push({
                    id: '#',
                    img: 'http://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/1f178a82b9014a9022375a6aae773912b21beed8.jpg',
                    title: ''
                })
                list.push({
                    id: '#',
                    img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574189529164&di=aea3f15346d4a88ed1d5c4c235db2fb5&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201606%2F14%2F20160614010026_ZAX42.jpeg',
                    title: ''
                })
            }else{
                list.push({
                    id: '#',
                    img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574189479862&di=5f19978d3212f1a5f041373b71f0546e&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201504%2F28%2F20150428212640_vLBGX.thumb.700_0.jpeg',
                    title: ''
                })
                list.push({
                    id: '#',
                    img: 'http://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/1f178a82b9014a9022375a6aae773912b21beed8.jpg',
                    title: ''
                })
                list.push({
                    id: '#',
                    img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574189576966&di=1cff2d0a58a30298795fe6c14f9d9169&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180823%2Faaf8531b5735406ca6aa164878bb85e2.jpeg',
                    title: ''
                })
            }
            this.imgs = list
        }
    }
}
</script>

<style scoped>
img{
    width:100%;
}

.title{
    z-index:100;
    position: absolute;
    bottom:0;
    left:50%;
    transform: translateX(-50%);
    font-size: 30px;
    color:#fff;
}
</style>