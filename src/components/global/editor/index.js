import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Editor from 'wangeditor';
import config from 'base/config.json';
import _mm from 'util/mm.js';
//使用该组件 还要定义一个 与 defaultDetail 相同的 原始值 用来接收修改后的detail
//参数 1. defaultDetail 传入的html 值
// 参数 2. getHtml 回调函数 获取html
class WangEditor extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        let _this = this;
        let  editor = new Editor(ReactDOM.findDOMNode(this._div));
        this.editor = editor;
        editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'emoticon',  // 表情
            'image',  // 插入图片
            'table',  // 表格
            'video' // 插入视频
        ]
        // console.log(this.props.editorHtml)
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = (html) => {
            this.props.getHtml(html);
        }
        editor.customConfig.uploadImgParams = {
            token: _mm.getToken()
        }
        editor.customConfig.zIndex = 0;
        // editor.customConfig.uploadImgShowBase64 = true;
        editor.customConfig.uploadFileName = 'files';
        editor.customConfig.uploadImgServer = config.server + '/admin/common/img';
        editor.customConfig.uploadImgHooks = {
            before: function (xhr, editor, files) {
                xhr.setRequestHeader("x-auth-token", _mm.getToken());
                // 图片上传之前触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
                
                // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                // return {
                //     prevent: true,
                //     msg: '放弃上传'
                // }
            },
            success: function (xhr, editor, result) {
                // let html_this.props.editorHtml;
                // console.log(editor)
                // console.log(result)
                // 图片上传并返回结果，图片插入成功之后触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            fail: function (xhr, editor, result) {
                // 图片上传并返回结果，但图片插入错误时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            error: function (xhr, editor) {
                // 图片上传出错时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },
            timeout: function (xhr, editor) {
                // 图片上传超时时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },
        
            // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
            // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
            customInsert: function (insertImg, result, editor) {
                console.log(result);
                let imgUrl = config.server + result.path;
                insertImg(imgUrl)
                // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
        
                // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                // var url = result.url
                // insertImg(url)
        
                // result 必须是一个 JSON 格式字符串！！！否则报错
            }
        }
        // editor.customConfig.customUploadImg = function (files, insert) {
        //     console.log(insert);
        //     // files 是 input 中选中的文件列表
        //     // insert 是获取图片 url 后，插入到编辑器的方法
        
        //     // 上传代码返回结果之后，将图片插入到编辑器中
        //     // insert(imgUrl)
        // }
        //设置可上传图片
        editor.create();
        //设置值
        editor.txt.html(this.props.defaultDetail);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.defaultDetail === this.props.defaultDetail){
            return false
        }else{
            this.editor.txt.html(nextProps.defaultDetail);
        }
    }
    render(){
        return (
            <div>
                <div  ref={ div => this._div = div}></div>
            </div>
        )
    }
}
export default WangEditor;