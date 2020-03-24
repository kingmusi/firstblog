import Router from 'koa-router'
import multer from 'koa-multer'

const router = new Router({
    prefix: '/upload'
})

const storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'static/uploads')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".")  //以点分割成数组，数组的最后一项就是后缀名
        cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1])
    }
})
//加载配置
var upload = multer({ storage: storage })

router.post('/img', upload.single('file'), async(ctx,next)=>{
    ctx.body = {
        code: 0,
        imgpath: '/uploads/'+ctx.req.file.filename//返回文件名
    }
})

export default router