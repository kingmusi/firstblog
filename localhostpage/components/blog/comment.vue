<template>
    <div class="container">
        <div v-if="comments.length">
            <dl 
                class="item-container" 
                v-for="(item, index) of comments"
                :key="index"
            >
                <dd>
                    <el-row class="item-father-container">
                        <el-col :span="5" class="item-left">
                            <div :style="{backgroundImage:'url(' + item.imgpath + ')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'contain'}"></div>
                        </el-col>
                        <el-col :span="18" :offset="1" class="item-right">
                            <div class="item-top">
                                <div class="item-user"><a href="#">{{item.user}}</a></div>
                                <div class="item-createtime">{{item.createtime}}</div>
                            </div>
                            <div class="item-mid">
                                <div class="item-content" v-html="item.comment"></div>
                            </div>
                            <div class="item-bottom">
                                <div class="item-comment" @click="dialogCommentVisible = true">评论</div>

                                <el-dialog :title="`你正在评论 ${item.user}`" :visible.sync="dialogCommentVisible">
                                    <el-input
                                        type="textarea"
                                        :rows="5"
                                        :placeholder="`评论${item.user}`"
                                        v-model="textarea">
                                    </el-input>
                                    <div>{{textareaAlert}}</div>

                                    <div slot="footer" class="dialog-footer">
                                        <el-button class="btn" @click="dialogCommentVisible = false">取 消</el-button>
                                        <el-button class="btn" type="primary" @click="usercomment(item.id)">确 定</el-button>
                                    </div>
                                </el-dialog>
                            </div>
                        </el-col>
                    </el-row>
                </dd>
                <dd>
                    <comment v-if="item.isto" :fromid="item.id" class="child-container"/>
                </dd>
            </dl>
        </div>
        <div class="no-comment" v-else>这篇还没有评论，赶紧来做这里的评论第一人吧！！！</div>
    </div>
</template>

<script>
export default {
    name: 'comment',
    props:['fromid'],
    data(){
        return{
            comments:[],
            dialogCommentVisible: false,
            textarea: '',
            textareaAlert: ''
        }
    },
    methods:{
        async usercomment(fromid){
            const that = this
            const articleid = this.$route.query.id

            const {status, data:{code, msg}} = await this.$axios.post('/comment/setChildComment', {
                fromid,
                comment: that.textarea,
                articleid: that.$route.query.id
            })

            this.textareaAlert = msg
            location.href = `/blog?id=${articleid}`
        }
    },
    async mounted(){
        const that = this
        const articleid = this.$route.query.id
        const {status, data: {code, comments} } = await this.$axios.post('/comment/getComment', {
            articleid,
            fromid:that.fromid
        })

        if(status === 200 && code === 0){
            let time,year,month,day,h,m,s
            comments.forEach(async item => {
                time = new Date(parseInt(item.createtime))
                year = time.getFullYear()
                month = time.getMonth() + 1
                day = time.getDate()
                h = time.getHours()
                m = time.getMinutes()
                s = time.getSeconds()
                item.createtime = `${year}-${month}-${day}  ${h}:${m}:${s}`

                const { status, data: {code, list} } = await that.$axios.post('/user/getUsermsgs', {
                    username: item.user
                })
                if(status === 200 && code === 0){
                    item.imgpath = list.img
                    this.comments = comments
                }else{
                    item.imgpath = '/default.jpg'
                    this.comments = comments
                }
            })
        }else{
            this.comments = []
        }
    }
}
</script>

<style scoped>
*{
    padding:0;
    margin:0;
    text-decoration: none;
}

.container{
    width:100%;
    padding:10px;
    border-radius: 10px;
    box-sizing: border-box;
    background: #ffffff;
}

.item-container{
    width:100%;
    border: 1px solid #FFB6C1;
    border-radius: 10px;
    padding: 10px 10px 25px 10px;
    box-sizing: border-box;
    margin-bottom:20px;
}

.item-father-container{
    position: relative;
}

.item-left{
    display:flex;
    justify-content: center;
    align-content: center;
    border-right:1px solid #ccc;
}

.item-left div{
    width:90%;
    padding-bottom:90%;
    border-radius:50%;
}

.item-right{
    padding-left:10px;
    box-sizing: border-box;
}

.item-top{
    border-bottom:1px dashed #ffb6c1;
    padding-bottom:5px;
}

.item-top:after{
        content: "";
        display: block;
        height: 0;
        clear:both;
        visibility: hidden;
}

.item-top .item-user{
    float: left;
    line-height: 22px;
    font-size:22px;
    padding-right: 20px;
}

.item-top .item-user a{
    color:#000;
}

.item-top .item-user a:hover{
    color:#FFB6C1;
}

.item-top .item-createtime{
    float:left;
    line-height: 28px;
    font-size: 14px;
    color: #FFB6C1;
}

.item-mid{
    width:100%;
    padding-top:5px;
}

.item-content{
    width:100%;
    word-wrap:break-word; 
}

.item-comment{
    position:absolute;
    bottom:0px;
    right:0px;
}

.item-bottom .item-comment:hover{
    color:#FFB6C1;
    cursor: pointer;
}

.btn{
    padding:20px;
}

.no-comment{
    text-align: center;
    color: #FFB6C1;
}
</style>