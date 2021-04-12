<template>
    <div class="container1">

      <ul
        class="infinite-list container2"
        v-infinite-scroll="load"
        :infinite-scroll-delay="300"
        style="overflow:auto">
          <li v-for="(item,index) of list" :key="index" class="infinite-list-item list-container">
            <List :list="item"/>
          </li>
      </ul>
      <div class="loading" v-if="loading"><p class="el-icon-loading"></p></div>
      <p v-if="noMore" class="nomore">没有更多了</p>
    </div>
</template>

<script>
import List from '@/components/index/list'

export default {
    components: {
      List
    },
    data () {
      return {
        list:[],
        countstart: 0,
        count: 10,
        loading: false,
        noMore: false
      }
    },
    methods: {
      async load () {
        if(!this.noMore){
          this.loading = true
          const that = this
          const bigType = this.$route.query.bigType || ''
          const smallType = this.$route.query.smallType || ''

          const {status, data:{ code, result, msg } } = await this.$axios.get('http://kingmusi.cn/blog/getBloglist', {
            params:{
              bigType,
              smallType,
              countstart: that.countstart,
              count: that.count
            }
          })

          if(status === 200 && code === 0){
            let time,year,month,day
            result.forEach(item => {
              time = new Date(item.createtime)
              year = time.getFullYear()
              month = time.getMonth() + 1
              day = time.getDate()
              item.createtime = `${year}-${month}-${day}`

              item.content = item.content.toString().replace(/<.+?>/g, '')
              item.content = item.content.toString().replace(/&lt;.+?&gt;/g, '')
              item.content = item.content.toString().replace(/&nbsp;/g, '')
              item.content = item.content.substring(0,200)
            })

            this.list = result
            this.countstart += this.count
          }else{
            this.noMore = true
          }

          this.loading = false;
        }
      }
    }
};
</script>

<style>
.container1 {
    position:relative;
}

.container1 .loading{
  font-size: 30px;
  text-align: center;
}

.loading,
.nomore{
  width: 100%;
  margin: 0 auto;
  padding:10px;
  text-align: center;
  color:#FFB6C1;
  background: #fff;
  box-shadow: 0 5px 15px -5px rgba(0,0,0,.5);
  border-radius: 10px;
  box-sizing: border-box;
}
</style>
