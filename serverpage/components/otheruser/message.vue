<template>
    <div>
        <el-row class="box-container">
            <el-col :span="8" class="left-container">
                <h1>{{list.username}}</h1>
                <span class="el-icon-male sex">{{list.sex}}</span>
            </el-col>
            <el-col :span="8" class="img-container">
                <div ref="imgContainer"></div>
            </el-col>
            <el-col :span="7" class="right-container">
                <span>个人签名：</span>
                <div>{{list.profile}}</div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogFormVisible: false,
            list: {}
        };
    },
    methods: {
        showImg(url) {
            const imgContainer = this.$refs.imgContainer;
            imgContainer.style.background = `url(${url})`;
            imgContainer.style.backgroundSize = "contain";
            imgContainer.style.backgroundPosition = "center";
            imgContainer.style.backgroundRepeat = "no-repeat";
        },
    },
    async mounted() {
        const that = this
        const {
            status,
            data: { code, list, msg }
        } = await this.$axios.post("http://kingmusi.cn/user/getUsermsgs", {
            username: that.$route.query.author
        });
        if (status === 200 && code === 0) {
            this.list = list;
            if (list.img) {
                this.showImg(this.list.img);
            } else {
                this.showImg("/default.jpg");
            }
        }
    }
};
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

.box-container {
    position: relative;
    padding: 20px;
    background: rgba(255, 99, 71, 0.7);
}

.box-container .left-container {
    text-align: right;
    padding-top: 100px;
    height: 250px;
    color: #ffe4e1;
}

.sex {
    padding-top: 10px;
    font-size: 16px;
}

.box-container .img-container {
    text-align: center;
}

.box-container .img-container div {
    display: inline-block;
    width: 250px;
    height: 250px;
    border-radius: 50%;
}

.box-container .right-container {
    text-align: left;
    padding-top: 110px;
    padding-right: 100px;
    height: 250px;
    color: #ffe4e1;
}

.box-container .right-container div {
    padding-top: 10px;
}


</style>