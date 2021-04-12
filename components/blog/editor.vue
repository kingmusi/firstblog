<template>
    <div class="container">
        <div id="wangeditor" class="editor-container">
            <div id="editorMenu" class="editorMenu" ref="editorMenu"></div>
            <div id="editor" class="editor" ref="editor" style="text-align:left;"></div>
        </div>
        <el-button type="danger" class="submit" @click="submit">确定</el-button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            editor: null, // 富文本编辑器
            editorContent: "" // 富文本编辑器内容
        }
    },
    methods:{
        // 在类型发生变化时发生，参数未新值，是一个数组
        // 在类型发生变化时，把结果放入 typeResult 来记录最新结果
        handleTypeChange(value) {
            this.typeResult = [];
            value.forEach(item => this.typeResult.push(item));
        },
        // 在封面图片上传成功时发生
        // 当响应正确时，把返回的图片地址 = imgpath 来记录最新结果
        handleImgSuccess(response, file, fileList) {
            this.imgpath = "";
            if (response.code === 0) {
                this.imgpath = response.imgpath;
            }
        },
        // 对富文本编辑器 Wangeditor 的处理，在 mounted 中执行
        handleWangeditor() {
            if (process.browser) {
                const E = require("wangeditor");
                this.editor = new E(this.$refs.editorMenu, this.$refs.editor);

                // 对编辑器配置
                this.editor.customConfig.pasteFilterStyle = false; // 不用过滤复制原本的样式

                // 配置 上传图片 并显示在编辑器中
                this.editor.customConfig.uploadFileName = "file"; // 设置上传图片的 name
                this.editor.customConfig.uploadImgServer = "/upload/img"; // 设置上传图片的服务器接口
                this.editor.customConfig.uploadImgHooks = {
                    // 自定义方法， 上传成功后做什么
                    // 参数一位插入图片到编辑器的方法，参数二为返回的结果， 参数三为编辑器dom
                    customInsert(insertImg, result, editor) {
                        if (result.code === 0) {
                            insertImg(result.imgpath);
                        }
                    }
                };

                // 编辑器的事件，每次改变会获取其html内容
                this.editor.customConfig.onchange = html => {
                    this.editorContent = html;
                    // 把这个html通过catchData的方法传入父组件
                };

                this.editor.create(); // 创建富文本实例

            }
        },
        async submit(){
            const that = this
            const id = this.$route.query.id
            if(this.editorContent){
                const {status, data: {code, msg} } = await this.$axios.post('http://kingmusi.cn/comment/setComment', {
                    id,
                    comment: that.editorContent,
                    touser: ''
                })

                window.scrollTo(0, 0)
                that.$alert(`${msg}`, {
                    confirmButtonText: "确定",
                    callback: action => {
                        location.href = `/blog?id=${id}`
                    }
                })
            }else{
                window.scrollTo(0, 0)
                that.$alert(`未填写内容`, {
                    confirmButtonText: "确定",
                    callback: action => {
                        that.$router.push({ path: `/blog?id=${id}`});
                    }
                })
            }
        }
    },
    async mounted() {
        this.handleWangeditor()
    },
};
</script>

<style scoped>
*{
    padding:0;
    margin:0
}

.container{
    width:100%;
    padding:20px;
    background: #FFF;
    border-radius: 10px;
    box-sizing: border-box;
}

.editorMenu {
    border: 1px solid #ccc;
}

.editor {
    margin-top: -1px;
    border: 1px solid #ccc;
    min-height: 300px;
    height: auto;
}

.submit {
    width: 100%;
    padding: 10px;
    margin-top: 30px;
    box-sizing: border-box;
}
</style>