<template>
    <div class="container1">
        <div class="container2">
            <el-breadcrumb separator-class="el-icon-right" class="breadcrumb-container">
                <el-breadcrumb-item>
                    <a href="/">首页</a>
                </el-breadcrumb-item>
                <el-breadcrumb-item>注册</el-breadcrumb-item>
            </el-breadcrumb>

            <el-row class="container3">
                <el-col :span="12">
                    <img :src="img" style="width:100%;border-radius:10px;" />
                </el-col>

                <el-col :span="12">
                    <div class="login-text">注册</div>

                    <el-form
                        :model="ruleForm"
                        :rules="rules"
                        ref="ruleForm"
                        label-width="80px"
                        class="demo-ruleForm form-container"
                    >
                        <el-form-item label="用户名" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>

                        <el-form-item label="密码" prop="password">
                            <el-input v-model="ruleForm.password" type="password"></el-input>
                        </el-form-item>

                        <el-form-item label="确认密码" prop="cpassword">
                            <el-input v-model="ruleForm.cpassword" type="password"></el-input>
                        </el-form-item>

                        <el-form-item prop="register">
                            <el-button type="danger" @click="register" class="form-button">确定</el-button>
                        </el-form-item>
                    </el-form>

                    <div class="register-text">
                        已经有账号？
                        <nuxt-link to="/login" style="color:#FFB6C1;">点这里登录！</nuxt-link>
                    </div>
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
                name: "",
                password: "",
                cpassword: ''
            },
            rules: {
                name: [{
                    required: true, type: 'string', message: '请输入用户名' , trigger: 'blur'
                }],
                password:[{
                    required:true, message:'请输入密码', trigger:'blur'
                }],
                cpassword: [{
                    required: true, message: '请确认密码', trigger: 'blur'
                }, {
                    validator: (rule, value, callback) => {
                        if(value !== this.ruleForm.password){
                            callback(new Error('两次密码不一致'))
                        }else{
                            callback()
                        }
                    },
                    trigger: 'blur'
                }]
            }
        };
    },
    methods: {
        async register(){
            const that = this
            this.$refs['ruleForm'].validate((valid) => {
                if(valid){
                    that.$axios.post('http://47.104.235.245/user/register', {
                        username: that.ruleForm.name,
                        password: cryp.MD5(that.ruleForm.password).toString()
                    }).then( ({status, data: {code, msg}}) => {
                        if(status === 200 && code === 0){
                            that.$alert(`${msg}`,{
                                confirmButtonText:'确定',
                                callback:action=>{
                                    that.$router.push({path:'/login'})
                                }
                            })
                        }else{
                            that.$alert(`注册失败，${msg}`,{
                                confirmButtonText:'确定',
                                callback:action=>{
                                    that.$router.push({path:'/register'})
                                }
                            })
                        }
                    })

                    that.$axios.post('http://47.104.235.245/user/default', {
                        username: that.ruleForm.name
                    })
                }else{
                    that.$alert('你的信息未完全填写或填写错误',{
                        confirmButtonText:'确定',
                        callback:action=>{
                            that.$router.push({path:'/register'})
                        }
                    })
                }
            })
        }
    },
    mounted(){
    let _this = this
        document.onkeydown = function(e) {
            if(e.keyCode === 13){
                _this.register()
            }
        }
    },
    async asyncData() {
        return {
            img:
                "/register.jpg"
        };
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
    height: 580px;
    padding: 10px;
}

.login-text {
    text-align: center;
    font-size: 22px;
    color: #ffb6c1;
    padding-left: 40px;
    margin-top: 20px;
}

.breadcrumb-container {
    height: 60px;
    line-height: 60px;
    padding-left: 30px;
    font-size: 20px;
    margin-top: 30px;
    border-bottom: 1px dashed #ffb6c1;
}

.form-container {
    margin-top: 20px;
    margin-right: 20px;
}

.form-button {
    width: 100%;
    background: #ffb6c1;
    border: 1px solid #ffb6c1;
}

.register-text {
    margin-top: 20px;
    margin-right: 20px;
    text-align: right;
}
</style>