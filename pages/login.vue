<template>
    <div class="container1">
        <div class="container2">
            <el-breadcrumb separator-class="el-icon-right" class="breadcrumb-container">
                <el-breadcrumb-item>
                    <a href="/">首页</a>
                </el-breadcrumb-item>
                <el-breadcrumb-item>登录</el-breadcrumb-item>
            </el-breadcrumb>

            <el-row class="container3">
                <el-col :span="12">
                    <img
                        :src="img"
                        style="width:100%;border-radius:10px;"
                    />
                </el-col>

                <el-col :span="12">
                    <div class="login-text">登录</div>

                    <el-form
                        :model="ruleForm"
                        :rules="rules"
                        ref="ruleForm"
                        label-width="80px"
                        class="demo-ruleForm form-container"
                    >
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="ruleForm.username"></el-input>
                        </el-form-item>

                        <el-form-item label="密码" prop="password">
                            <el-input v-model="ruleForm.password" type="password"></el-input>
                        </el-form-item>

                        <el-form-item prop="login">
                            <el-button type="danger" @click="login" class="form-button">登录</el-button>
                        </el-form-item>
                    </el-form>

                    <div class="register-text">还没有账号？<nuxt-link to="/register" style="color:#FFB6C1;">点这里注册！</nuxt-link></div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script scoped>
import cryp from 'crypto-js'

export default {
    layout: "blank",
    data() {
        return {
            ruleForm: {
                username: "",
                password: ""
            },
            rules:{
                username: [{
                    required:true, type:'string', message:'请输入用户名', trigger:'blur'
                }],
                password:[{
                    required:true, message:'请输入密码', trigger:'blur'
                }]
            }
        };
    },
    methods: {
        async login(){
            const that = this
            const { status, data: {code, msg} } = await this.$axios.post('/user/login', {
                username: that.ruleForm.username,
                password: cryp.MD5(that.ruleForm.password).toString()
            })

            if(status === 200 && code === 0){
                location.href = '/'
            } else{
                this.$alert(`登录失败，${msg}`,{
                    confirmButtonText:'确定',
                    callback:action=>{
                        that.$router.push({path:'/login'})
                    }
                })
            }
        }
    },
    mounted(){
    let _this = this
        document.onkeydown = function(e) {
            if(e.keyCode === 13){
                _this.login()
            }
        }
    },
    async asyncData() {
        return {
            img: '/login.jpg'
        }
    }
};
</script>

<style scoped>
.container1 {
    width: 100%;
}

.container2 {
    width: 800px;
    margin: 0 auto;
    background: #fff;
    border-radius: 10px;
}

.container3 {
    height:560px;
    padding: 10px;
}

.login-text{
    text-align: center;
    font-size: 22px;
    color: #FFB6C1;
    padding-left:40px;
    margin-top: 20px;
}

.breadcrumb-container {
    height: 60px;
    line-height: 60px;
    padding-left: 30px;
    font-size: 20px;
    margin-top: 30px;
    border-bottom:1px dashed #FFB6C1;
}

.form-container {
    margin-top: 20px;
    margin-right: 20px;
}

.form-button{
    width:100%;
    background: #FFB6C1;
    border:1px solid #FFB6C1;
}

.register-text{
    margin-top:20px;
    margin-right:20px;
    text-align:right;
}
</style>