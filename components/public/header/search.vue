<template>
    <div class="container">
        <el-input
            placeholder="请输入关键字"
            prefix-icon="el-icon-search"
            v-model="search"
            class="input"
            @blur="blur"
            @focus="focus"
            @input="input"
        ></el-input>

        <dl class="search-container" v-if="searchShow">
            <dd v-for="(item,index) of list" :key="index">
                <nuxt-link :to="`/blog?id=${item.id}`" class="searchlist-text">{{ item.title }}</nuxt-link>
            </dd>
        </dl>
    </div>
</template>

<script>
import _ from "lodash";

export default {
    data(){
        return {
            search: '',
            list: [],
            searchShow:false
        }
    },
    watch:{
        search(newInput){
            if(newInput){
                this.searchShow = true
            }else{
                this.searchShow = false
            }
        }
    },
    methods:{
        focus(){
            if(this.search){
                this.searchShow = true
            }
        },
        blur(){
            const that = this
            setTimeout(() => {
                that.searchShow = false
            }, 100)
        },
        input: _.debounce(async function() {
            const that = this;
            this.list = [];
            const { status, data: { list,code,msg } } = await that.$axios.get("http://kingmusi.cn/blog/selectBlog", {
                params: {
                    search: that.search
                }
            });
            console.log(list)
            this.list = list
        }, 300)
    }
}
</script>

<style scoped>
    .container{
        position:relative;
    }

    .input{
        width:300px;
    }

    .search-container{
        z-index: 1000;
        position:absolute;
        top: 51px;
        left:0px;
        width:300px;
        padding:0 15px 0 15px;
        box-sizing: border-box;
        font-size:14px;
        background: #fff;
        border:1px solid #FFB6C1;
        border-radius: 10px;
    }

    .search-container dd{
        border-bottom:1px solid #FFB6C1;
        width:270px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .search-container dd:hover{
        cursor:pointer;
    }

    .search-container dd .searchlist-text{
        color:#FFB6C1;
    }
</style>