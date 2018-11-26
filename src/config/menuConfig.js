const menuConfig = [
    {
        title:'首页',
        key:'/',
        icon:'home'
    },
    {
        title:'新闻管理',
        key:'/news',
        icon:'calendar',
        children:[
            {
                key:'/news/newsEdit/file',
                title:'新闻编辑'
            },
            {
                key:'/news/newsAudit/file',
                title:'新闻审核'
            },
            {
                key:'/news/newsIssue/file',
                title:'新闻发布'
            }
        ]
    },
    {
        title:'视频管理',
        key:'/video',
        icon:'video-camera',
        children:[
            {
                key:'/video/videoEdit/file',
                title:'视频编辑'
            },
            {
                key:'/video/videoAudit/file',
                title:'视频审核'
            },
            {
                key:'/video/videoIssue/file',
                title:'视频发布'
            }
        ]
    },
    {
        title:'直播管理',
        key:'/live',
        icon:'play-circle',
        children:[
            {
                key:'/live/liveEdit/file',
                title:'直播编辑'
            },
            {
                key:'/live/liveAudit/file',
                title:'直播审核'
            },
            {
                key:'/live/liveIssue/file',
                title:'直播发布'
            }
        ]
    },
    // {
    //     title:'音乐管理',
    //     key:'/music',
    //     icon:'play-circle-o',
    //     children:[
    //         {
    //             key:'/music/musicEdit/banner',
    //             title:'音乐编辑'
    //         },
    //         {
    //             key:'/music/musicAudit/banner',
    //             title:'音乐审核'
    //         },
    //         {
    //             key:'/music/musicIssue/banner',
    //             title:'音乐发布'
    //         }
    //     ]
    // },
    {
        title:'商家管理',
        key:'/service',
        icon:'shop',
        children:[
            {
                key:'/service/serviceEdit/file',
                title:'商家编辑'
            },
            {
                key:'/service/serviceAudit/file',
                title:'商家审核'
            },
            {
                key:'/service/serviceIssue/file',
                title:'商家发布'
            }
        ]
    },
    {
        title:'商品管理',
        key:'/discounts',
        icon:'shopping-cart',
        children:[
            {
                key:'/discounts/discountsEdit/file',
                title:'商品编辑'
            },
            {
                key:'/discounts/discountsAudit/file',
                title:'商品审核'
            },
            {
                key:'/discounts/discountsIssue/file',
                title:'商品发布'
            },
            {
                key:'/discounts/order',
                title:'订单管理'
            }
        ]
    },
    {
        title:'搜索管理',
        key:'/search',
        icon:'search',
        children:[
            {
                key:'/search/searchEdit/recommend/7',
                title:'搜索编辑'
            },
            {
                key:'/search/searchAuth/recommend/7',
                title:'搜索审核'
            },
            {
                key:'/search/searchIssue/recommend/7',
                title:'搜素发布'
            }
        ]
    },
    {
        title:'广告管理',
        key:'/advertising',
        icon:'tags-o',
        children:[
            {
                key:'/advertising/advertisingEdit/start',
                title:'广告编辑'
            },
            {
                key:'/advertising/advertisingAuth/start',
                title:'广告审核'
            },
            {
                key:'/advertising/advertisingIssue/start',
                title:'广告发布'
            }
        ]
    },
    {
        title:'系统管理',
        key:'/system',
        icon:'setting',
        children:[
            {
                key:'/system/auth/inner',
                title:'权限管理'
            },
            {
                key:'/system/sign/0',
                title:'标签管理'
            }
        ]
    },
    {
        title:'用户管理',
        key:'/user',
        icon:'user',
        children:[
            {
                key:'/user/info/1',
                title:'用户信息'
            },
            {
                key:'/user/comment/1',
                title:'评论管理'
            }
        ]
    }
]

export default menuConfig;