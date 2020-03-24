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

            <el-col :span="1">
                <el-button
                    class="el-icon-edit btn"
                    type="danger"
                    @click="dialogFormVisible = true"
                >修改</el-button>
            </el-col>
        </el-row>

        <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible" class="form-container">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="80px"
                class="demo-ruleForm form-container"
            >
                <el-form-item label="性别" prop="sex" class="form-item">
                    <el-radio-group v-model="ruleForm.sex">
                        <el-radio label="男" class="sex-item"></el-radio>
                        <el-radio label="女" class="sex-item"></el-radio>
                        <el-radio label="人妖"></el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="个人签名" prop="profile" class="form-item">
                    <el-input v-model="ruleForm.profile"></el-input>
                </el-form-item>

                <el-row class="form-item">
                    <el-col :span="3">封面图片</el-col>
                    <el-col :span="21">
                        <el-upload
                            class="upload-demo"
                            action="/upload/img"
                            :file-list="fileList"
                            :limit="1"
                            accept="image/jpeg, image/gif, image/png"
                            list-type="picture"
                            name="file"
                            :on-success="handleImgSuccess"
                        >
                            <el-button type="danger" class="form-button">点击上传</el-button>
                        </el-upload>
                    </el-col>
                </el-row>

                <el-form-item prop="login" class="form-item">
                    <el-button type="danger" class="form-button" @click="formMsgs">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogFormVisible: false,
            list: {},
            ruleForm: {
                sex: "",
                profile: ""
            },
            rules: {},
            fileList: [], // 与封面图片绑定的值
            imgpath: ""
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
        // 在封面图片上传成功时发生
        // 当响应正确时，把返回的图片地址 = imgpath 来记录最新结果
        handleImgSuccess(response, file, fileList) {
            this.imgpath = "";
            if (response.code === 0) {
                this.imgpath = response.imgpath;
            }
        },
        async formMsgs() {
            const that = this;
            if (this.ruleForm.sex) {
                const {
                    status,
                    data: { code, msg }
                } = await this.$axios.post("/user/update", {
                    sex: that.ruleForm.sex,
                    profile: that.ruleForm.profile,
                    img: that.imgpath
                });

                if (status === 200 && code === 0) {
                    location.href = `/user`;
                } else {
                    that.$alert(`${msg}`, {
                        confirmButtonText: "确定",
                        callback: action => {
                            that.$router.push({
                                path: `/updatearticle?id=${id}`
                            });
                        }
                    });
                }
            } else {
                that.$alert(`性别不能为空`, {
                    confirmButtonText: "确定",
                    callback: action => {
                        that.$router.push({ path: `/updatearticle?id=${id}` });
                    }
                });
            }
        }
    },
    async mounted() {
        const {
            status,
            data: { code, list, msg }
        } = await this.$axios.post("/user/getUsermsgs", {
            username: ''
        });
        if (status === 200 && code === 0) {
            this.list = list;
            if (list.img) {
                this.showImg(this.list.img);
            } else {
                this.showImg("/default.jpg");
            }

            // 修改返回默认值
            this.ruleForm.sex = list.sex;
            this.ruleForm.profile = list.profile;
            this.fileList = [{ name: "1.jpg", url: list.img }];
            this.imgpath = list.img;
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

.btn {
    position: absolute;
    bottom: 10px;
    padding: 10px;
}

.form-container {
    text-align: center;
}

.form-container .form-item {
    margin-top: 15px;
}

.form-container .sex-item {
    margin-right: 20px;
}

.form-container .form-button {
    display: inline-block;
    width: 100px;
    padding: 10px;
    box-sizing: border-box;
}
</style>