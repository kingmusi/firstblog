<template>
    <div class="page-container">
        <div class="box-container">
            <h1>创建文章ing <span class="el-icon-loading"></span></h1>

            <el-row class="list-container">
                <el-col :span="3" class="label">标题：</el-col>
                <el-col :span="21">
                    <el-input
                        class="title"
                        prefix-icon="el-icon-collection-tag"
                        placeholder="请输入文章标题"
                        v-model="title"
                        maxlength="40"
                        show-word-limit
                    ></el-input>
                </el-col>
            </el-row>

            <el-row class="list-container">
                <el-col :span="3" class="label">封面图片：</el-col>
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
                        <el-button type="danger" class="img-button">点击上传</el-button>
                        <div
                            slot="tip"
                            class="el-upload__tip img-text"
                        >如果你希望你的文章出现在首页轮播图中，请尽量上传文章的封面图</div>
                    </el-upload>
                </el-col>
            </el-row>

            <el-row class="list-container">
                <el-col :span="3" class="label">类型：</el-col>
                <el-col :span="21" class="cascader-container">
                    <el-cascader-panel :options="options" @change="handleTypeChange"></el-cascader-panel>
                </el-col>
            </el-row>

            <div id="wangeditor" class="editor-container">
                <div id="editorMenu" class="editorMenu" ref="editorMenu"></div>
                <div id="editor" class="editor" ref="editor" style="text-align:left;"></div>
            </div>

            <el-button type="danger" class="submit" @click="submit">确定</el-button>

            <img :src="img" alt />
        </div>
    </div>
</template>

<script>
export default {
    name: "Editor",
    data() {
        return {
            img: "",
            title: "", // 与标题输入框绑定的值
            fileList: [], // 与封面图片绑定的值
            imgResult: "", // 记录封面图片的最新结果的url
            options: [],
            typeResult: [], // 自定义：类型的结果
            editor: null, // 富文本编辑器
            editorContent: "" // 富文本编辑器内容
        };
    },
    methods: {
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
        // 点击 确定按钮 成功时发生
        async submit() {
            const that = this;
            if (this.title && this.typeResult.length && this.editorContent) {
                const {
                    status,
                    data: { code, msg, id }
                } = await this.$axios.post("http://kingmusi.cn/blog/create", {
                    title: that.title,
                    bigType: that.typeResult[0],
                    smallType: that.typeResult[1],
                    content: that.editorContent,
                    img: that.imgpath ? that.imgpath : ''
                });

                if (status === 200 && code === 0) {
                    location.href = `/blog?id=${id}`;
                } else {
                    window.scrollTo(0, 0);
                    that.$alert(`创建失败，${msg}`, {
                        confirmButtonText: "确定",
                        callback: action => {
                            that.$router.push({ path: "/login" });
                        }
                    });
                }
            } else {
                window.scrollTo(0, 0);
                that.$alert(`题目或类型或内容未填写`, {
                    confirmButtonText: "确定",
                    callback: action => {
                        that.$router.push({ path: "/create" });
                    }
                });
            }
        }
    },
    async mounted() {
        this.handleWangeditor()
    },
    async asyncData(ctx){
        // 类型列表通过 ssr 的方式渲染，体验更好
        const {status, data: {code, typeList}} = await ctx.$axios.get('http://kingmusi.cn/blog/getType')

        if(status === 200 && code === 0){
            return {
                options: typeList
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

h1{
    padding-top:50px;
    color: #ffb6c1;
}

.page-container {
    width: 100%;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    text-align: center;
    padding:10px;
}

.list-container {
    padding: 15px 30px 15px 0px;
    margin-top: 20px;
    border-bottom: 1px dashed #ccc;
    box-sizing: border-box;
}

.label {
    text-align: center;
    line-height: 40px;
    color: #ffb6c1;
    font-size: 18px;
}

.img-button {
    padding: 10px 20px 10px 20px;
}

.img-text {
    color: #ccc;
    font-size: 14px;
}


.editor-container {
    padding: 20px;
}

.editorMenu {
    border: 1px solid #ccc;
}

.editor {
    margin-top: -1px;
    border: 1px solid #ccc;
    min-height: 700px;
    height: auto;
}

.submit {
    width: 50%;
    padding: 10px;
    margin: 30px 0 50px 0;
    box-sizing: border-box;
}
</style>