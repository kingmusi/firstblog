<template>
    <dl>
        <dt>
            <el-input v-model="search" placeholder="搜素文章标题关键词" @input="input"></el-input>
        </dt>
        <dd
            class="item-container"
            v-for="(item,index) of showlist"
            :key="index"
        >
            <nuxt-link :to="`/blog?id=${item.id}`" class="title">{{item.title}}</nuxt-link>
            <div>{{item.createtime}}</div>
            <nuxt-link :to="`/updatearticle?id=${item.id}`" class="update">修改</nuxt-link>
            <nuxt-link :to="`/delete?id=${item.id}`" class="delete">删除</nuxt-link>
        </dd>
        <dd v-if="!showlist.length" class="noData">
            你还没有创建文章，赶紧来
            <nuxt-link to="/create" class="noData-a">创建</nuxt-link>
            吧
        </dd>
    </dl>
</template>

<script>
export default {
    data(){
        return{
            list:[],
            showlist:[],
            search: ''
        }
    },
    methods:{
        input(){
            const that = this
            if(this.search === ''){
                this.showlist = this.list
                return
            }
            this.showlist = []
            this.list.forEach(item => {
                if(item.title.includes(that.search) || item.title.toUpperCase().includes(that.search) || item.title.toLowerCase().includes(that.search)){
                    that.showlist.push(item)
                }
            })
        }
    },
    async mounted(){
        const that = this
        const {status, data:{code, result, msg}} = await this.$axios.get('http://kingmusi.cn/blog/getUserBlog')

        if(status === 200 && code === 0){
            let time,year,month,day,h,m,s
            result.forEach(item => {
                time = new Date(item.createtime)
                year = time.getFullYear()
                month = time.getMonth() + 1
                day = time.getDate()
                h = time.getHours()
                m = time.getMinutes()
                s = time.getSeconds()
                item.createtime = `${year}-${month}-${day}  ${h}:${m}:${s}`
            })
            this.list = result
            this.showlist = result
        }else if(status === 200 && code === -1){
            this.$alert(`${msg}`,{
                confirmButtonText:'确定',
                callback:action=>{
                    that.$router.push({path:'/login'})
                }
            })
        }else{
            this.$alert(`服务器出错`,{
                confirmButtonText:'确定',
                callback:action=>{
                    that.$router.push({path:'/'})
                }
            })
        }
    }
};
</script>

<style scoped>
*{
    padding:0;
    margin:0;
    text-decoration: none;
}

.item-container{
    position: relative;
    border:1px solid #FFB6C1;
    margin-top:20px;
    border-radius: 10px;
}

.item-container .title{
    display:block;
    width:100%;
    margin:10px 10px 20px 10px;
    font-size: 20px;
    color:#000;
    word-wrap:break-word;
}

.item-container .title:hover{
    color:#FFB6C1;
}

.item-container div{
    position: relative;
    bottom:10px;
    left:10px;
    color:#858585;
}

.item-container .update,
.item-container .delete{
    position:absolute;
    color:#858585;
    bottom:10px;
    right:10px;
    font-size: 14px;
}

.item-container .update{
    right:50px;
}

.item-container .update:hover,
.item-container .delete:hover{
    color:#FFB6C1;
}

.noData{
    text-align:center;
    padding-top:30px;
}

.noData .noData-a{
    color:#000;
}

.noData .noData-a:hover{
    color:#FFB6C1
}
</style>