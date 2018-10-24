import React,{Component} from 'react';
import _mm from 'util/mm.js';
import NewDetailComponent from 'components/news/newsDetail/index.js';
import ServiceFileDetail from 'components/service/fileDetail.js';
import DiscountsFileDetail from 'components/discounts/fileDetail.js';
import VideoFileDetail from 'components/video/fileDetail.js';
// 广告
import BannerDetail from 'components/advertising/bannerDetail.js'; 
import StartDetail from 'components/advertising/startDetail.js'; 
// import NewDetailComponent from 'components/news/newsDetail';
// import NewDetailComponent from 'components/news/newsDetail';
//传入 getUrl 回调函数获取数据；
class FileDetail extends Component{
    constructor(props){
        super(props)
        this.type = _mm.getParam('type');
    }
    render(){
        console.log(this.type)
            let Res;
            Res = {
                '0':<NewDetailComponent/>,
                '1':<ServiceFileDetail/>,
                '2':<DiscountsFileDetail/>,
                '4':<VideoFileDetail/>,
                '6':<BannerDetail/>
            }
        return (
            <div>
               {Res[this.type]}
            </div>
        )
    }
}

export default FileDetail;