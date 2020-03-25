<template>
    <el-row>
        <el-col :span="24">
            <el-menu
                :default-active="activeIndex" 
                class="el-menu-demo" 
                mode="horizontal" 
                @select="handleSelect"
                background-color="#FFB6C1"
                text-color="#FFFAFA"
            >
                <el-menu-item class="usertext">{{navText}} <nuxt-link to="/exit" v-if="user">【退出】</nuxt-link> </el-menu-item>
                <el-menu-item index="1">
                    <a href="/">首页</a>
                </el-menu-item>
                <el-menu-item index="2">
                    <a href="/login">登陆</a>
                </el-menu-item>
                <el-menu-item index="3">
                    <a href="/register">注册</a>
                </el-menu-item>
                <el-menu-item index="4" v-show="user">
                    <a href="/user">个人中心</a>
                </el-menu-item>
                <el-submenu 
                    v-for="(item,index) of typeList" 
                    :key="index" 
                    :index="`${index+5}`"
                >
                    <template slot="title"><a :href="`/?bigType=${item.value}`">{{item.label}}</a></template>
                    <el-menu-item 
                        v-for="(childitem, childindex) of item.children" 
                        :key="childindex" 
                        :index="`${index+5}-${childindex+1}`"
                        
                    >
                        <a :href="`/?smallType=${childitem.value}`">{{childitem.label}}</a>
                    </el-menu-item>
                </el-submenu>

                <Search class="search" />
            </el-menu>
        </el-col>    
    </el-row>    
</template>

<script>
import Search from './search.vue'

export default {
    components:{
        Search
    },
    data(){
        return{
            activeIndex:'1',
            navText: '',
            user: '',
            typeList:[]
        }
    },
    methods:{
        handleSelect(key, keyPath){
            
        }
    },
    async mounted(){
        const that = this
        const { status, data: {code, username} } = await this.$axios.get('/user/getUser')
        if(status === 200 && code === 0){
            this.navText = `欢迎呀，${username}`
            this.user = username
        } else{
            this.navText = `死去登录吧好不好`
        }

        const { status:status1, data: {code:code1, typeList}} = await this.$axios.get('/blog/getType')
        if(status1 === 200 && code1 === 0){
            this.typeList = typeList
        }
    }
}
</script>

<style>
    *{
        padding:0;
        margin:0;
        text-decoration: none;
    }

    .usertext{
        width:200px;
        text-align: center;
    }

    .navtext{
        width:150px;
        text-align:center;
    }

    .search{
        position: relative;
        left: 30px;
        display: inline;
        line-height: 60.8px;
    }

    a{
        color:#fff;
    }
</style>