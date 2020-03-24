<template>
    <div class="container">
        <h3><a :href="`/blog?id=${list.id}`" class="title">{{list.title}}</a></h3>
        <div v-html="list.content" class="content-conrainer"></div>
        <div class="other-container">
        时间：{{list.createtime}} | 
        作者:
        <!-- user弹出框 -->
        <el-popover
          placement="right"
          width="200"
          trigger="hover">
          <div class="user-imgContainer">
            <div ref="userimg"></div>
            <span>{{list.author}}</span>
          </div>
          <div class="user-textContainer">
            {{user.profile}}
          </div>
          <a class="aText" slot="reference" :href="`/otheruser?author=${list.author}`">{{list.author}}</a> 
        </el-popover> 
        
        | 分类: <a :href="`/?bigType=${list.bigType}`" class="aText">{{list.bigType}}</a> - <a :href="`/?smallType=${list.smallType}`" class="aText">{{list.smallType}}</a>
        </div>
    </div>
</template>

<script>
export default {
    props:['list'],
    data(){
      return{
        user: []
      }
    },
    async mounted(){
      const that = this
      const {status, data:{code, list, msg}} = await this.$axios.post('http://47.104.235.245/user/getUsermsgs', {
        username: that.list.author
      })
      if(status === 200 && code === 0){
        this.user = list
        const img = this.$refs.userimg
        img.style.display = 'inline-block'
        img.style.width = '50px'
        img.style.height = '50px'
        img.style.borderRadius = '50%'
        img.style.background = `url(${list.img})`
        img.style.backgroundRepeat = 'no-repeat'
        img.style.backgroundSize = 'contain'
        img.style.backgroundPosition = 'center'
      }
    }
}
</script>

<style scoped>
*{
    padding:0;
    margin:0
}

.container{
  width:100%;
  padding:20px;
  padding-top:10px;
  margin-top: 10px;
  margin-bottom:20px;
  box-sizing:border-box;
  background: rgba(255,255,255,0.8);
  box-shadow: 0 5px 15px -5px rgba(0,0,0,.5);
  border-radius: 10px;
}

h3{
  padding-bottom:10px;
  border-bottom: 1px dashed #FFB6C1;
}

.content-conrainer{
  padding-top:10px;
  font-size:14px;
  padding-bottom:20px;
  border-bottom:1px dashed #FFB6C1;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  word-break: break-all;
}

.other-container{
  padding-top: 20px;
  font-size:14px;
  color:rgb(155, 141, 141);
}

.title{
  color:#000;
}

.title:hover{
  color:#FFB6C1;
}

.aText{
  display:inline;
  color:rgb(90, 83, 83);
}

.aText:hover{
  color:#FFB6C1;
  cursor:pointer;
}

.user-imgContainer{
  height:50px;
  line-height: 50px;
  padding-bottom:10px;
  border-bottom:1px dashed #FFB6C1;
}

.user-imgContainer span{
  font-size: 20px;
}

.user-textContainer{
  word-wrap:break-word;
}
</style>