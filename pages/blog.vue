<template>
    <div class="page-container">
        <div class="box-container">
            <dl class="title-contianer">
                <dt>
                    <h1 class="title">{{title}}</h1>
                </dt>
                <dd class="time">{{showTime}}</dd>
                <dd class="author el-icon-user-solid">
                    <!-- user弹出框 -->
                    <el-popover placement="right" width="200" trigger="hover">
                        <div class="user-imgContainer">
                            <div ref="userimg"></div>
                            <span>{{author}}</span>
                        </div>
                        <div class="user-textContainer">{{profile}}</div>
                        <div class="aText" slot="reference">{{author}}</div>
                    </el-popover>
                </dd>
                <dd class="type el-icon-document-copy">
                    <a :href="`/?bigType=${bigType}`">{{bigType}}</a>
                    ---
                    <a :href="`/?smallType=${smallType}`">{{smallType}}</a>
                </dd>
            </dl>
            <img :src="img" v-if="img.length" style="width:100%" />
            <Content :content="content" class="content-container"></Content>
        </div>
        <comment :fromid="null" style="margin-bottom:20px;" />
        <editor />
    </div>
</template>

<script>
import Content from "@/components/blog/content.vue";
import editor from "@/components/blog/editor.vue";
import comment from "@/components/blog/comment.vue";

export default {
    components: {
        Content,
        editor,
        comment
    },
    data() {
        return {
            praisedIcon: "el-icon-circle-plus",
            profile: ''
        };
    },
    async asyncData(ctx) {
        const id = ctx.query.id;
        const {
            status,
            data: {
                code,
                title,
                content,
                createtime,
                author,
                img,
                bigType,
                smallType
            }
        } = await ctx.$axios.post("http://47.104.235.245/blog/getBlog", {
            id
        });

        const time = new Date(createtime);
        const year = time.getFullYear();
        const month = time.getMonth() + 1;
        const day = time.getDate();
        const h = time.getHours();
        const m = time.getMinutes();
        const s = time.getSeconds();
        const showTime = `${year}-${month}-${day}  ${h}:${m}:${s}`;

        if (status === 200 && code === 0) {
            return {
                title,
                content,
                showTime,
                author,
                img,
                bigType,
                smallType
            };
        } else {
            return {
                title: "",
                content: "",
                showTime: "",
                author: "",
                img: "",
                bigType: "",
                smallType: ""
            };
        }
    },
    async mounted() {
        const that = this;
        const {
            status,
            data: { code, list, msg }
        } = await this.$axios.post("http://47.104.235.245/user/getUsermsgs", {
            username: that.author
        });
        if (status === 200 && code === 0) {
            this.profile = list.profile
            const img = this.$refs.userimg;
            img.style.display = "inline-block";
            img.style.width = "50px";
            img.style.height = "50px";
            img.style.borderRadius = "50%";
            img.style.background = `url(${list.img})`;
            img.style.backgroundRepeat = "no-repeat";
            img.style.backgroundSize = "contain";
            img.style.backgroundPosition = "center";
        }
    }
};
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
    text-decoration: none;
}

.box-container {
    width: 100%;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    padding: 40px;
    box-sizing: border-box;
    margin-bottom: 40px;
}

.title-contianer {
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 20px;
    margin-bottom: 30px;
}

/* 清除浮动 */
.title-contianer:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}

.page-container .box-container .title {
    text-align: left;
    margin-bottom: 15px;
}

.page-container .box-container .time,
.page-container .box-container .author,
.page-container .box-container .type {
    line-height: 20px;
    float: left;
    color: #858585;
    font-size: 14px;
    padding-left: 30px;
}

.page-container .box-container .time {
    padding-left: 0;
}

a {
    color: #ffb6c1;
}

.content-container {
    word-wrap: break-word;
    width: 100%;
}

.user-imgContainer {
    height: 50px;
    line-height: 50px;
    padding-bottom: 10px;
    border-bottom: 1px dashed #ffb6c1;
}

.aText{
    display: inline-block;
    color:#ffb6c1;
    cursor:pointer;
}

.user-imgContainer span {
    font-size: 20px;
}

.user-textContainer {
    word-wrap: break-word;
}
</style>