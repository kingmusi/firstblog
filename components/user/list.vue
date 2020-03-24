<template>
    <div class="box-container">
        <el-breadcrumb separator-class="el-icon-right" class="breadcrumb-container">
            <el-breadcrumb-item>
                <a href="/">首页</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        </el-breadcrumb>

        <el-tabs v-model="activeName" @tab-click="handleClick" class="tab-container">
            <el-tab-pane label="我的文章" name="first">
                <userArticle v-if="isFirst"/>
            </el-tab-pane>
            <el-tab-pane label="我的关注" name="second"><div v-if="isSecond">我的关注</div></el-tab-pane>
            <el-tab-pane label="我的收藏" name="third"><div v-if="isThird">我的收藏</div></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import userArticle from './article.vue'

export default {
    components:{
        userArticle
    },
    data(){
        return{
            activeName:'first',     
            input:'',
            isFirst:true,
            isSecond:false,
            isThird:false
        }
    },
    methods:{
        handleClick(tab, event) {
            if(tab.name === 'first'){
                this.isFirst = true
            }else if(tab.name === 'second'){
                this.isSecond = true
            }else if(tab.name === 'third'){
                this.isThird = true
            }
        }
    }
}
</script>

<style scoped>
*{
    padding: 0;
    margin: 0;
}

.box-container{
    width:60%;
    padding:30px;
    margin:0 auto;
    background: rgba(255,255,255,0.8);
    border-radius: 10px;
    box-sizing: border-box;
}

.breadcrumb-container {
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    border-bottom:1px dashed #FFB6C1;
}
</style>