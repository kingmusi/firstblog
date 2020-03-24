<template>
    <dl class="container">
        <dd 
            class="list" 
            v-for="(item,index) of list" 
            :key="index"
        >
            <a :href="item.href" replace @click="wechat">
                <span :class="item.icon" class="icon"></span>
                <span class="text">{{item.text}}</span>
            </a>
        </dd>
    </dl>
</template>

<script>
export default {
    data(){
        return{
            list:[
            {
                href:'/create',
                icon:'el-icon-edit',
                text:'创建文章'
            },
            {
                href:'/create',
                icon:'el-icon-s-opportunity',
                text:'修改文章'
            }
        ]
        }
    },
    methods:{
        wechat(){

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

.container{
    width:100%;
}

.list{
    padding:10px;
}

.dashed{
    border-bottom:1px dashed #FFB6C1;
}

.list a span{
    color:#FFB6C1;
}

.icon{
    padding-left:5px;
}

.text{
    padding-left:10px
}

</style>