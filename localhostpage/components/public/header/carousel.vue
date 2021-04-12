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
                    img: '/animi1.jpg',
                    title: ''
                })
            }else if(len == 1){
                list.push({
                    id: '#',
                    img: '/animi1.jpg',
                    title: ''
                })
                list.push({
                    id: '#',
                    img: '/animi3.jpg',
                    title: ''
                })
            }else{
                list.push({
                    id: '#',
                    img: '/animi1.jpg',
                    title: ''
                })
                list.push({
                    id: '#',
                    img: '/animi2.png',
                    title: ''
                })
                list.push({
                    id: '#',
                    img: '/animi3.jpg',
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

@media screen and (min-width: 751px) {
 .title{
    z-index:100;
    position: absolute;
    bottom:0;
    left:50%;
    transform: translateX(-50%);
    font-size: 30px;
    color:#fff;
  }   
}

@media screen and (max-width: 750px) {
    .title{
        z-index:100;
        font-size: 14px;
        color:#fff;
    }
}
</style>