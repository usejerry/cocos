// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        userInfo_name :{
            type:cc.Label,
            default:null
        },
        userInfo_head_img :{
            type:cc.Sprite,
            default:null
        }

        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    start () {
        this.wx_login()
    },
    getUserData(data){
        let _this = this
        this.userInfo_name.string = data.userInfo.nickName;
                    
        cc.loader.load({url: data.userInfo.avatarUrl, type: 'png'}, function(err,img){    
            var myIcon  = new cc.SpriteFrame(img);      
            _this.userInfo_head_img.spriteFrame = myIcon;
        
        });

    },
    wx_login() {
        let _this  = this
        console.log( _this.userInfo_head_img)
        if (window.wx) {//确定是在微信真机环境下
            let sysInfo = wx.getSystemInfoSync();
            //获取微信界面大小
            let width = sysInfo.screenWidth;
            let height = sysInfo.screenHeight;

            wx.getUserInfo({
                success: function(data) {
                    console.log(data,55)
                    _this.getUserData(data)
                },
                fail:function(err){
                   let  btnWeixinUser = wx.createUserInfoButton({//定义按钮样式
                        type: 'text',
                        text: '',
                        style: {
                            left: 0,
                            top: 0,
                            width: width,
                            height: height,
                            lineHeight: height,
                            background: '#00000000',
                            color: '#ffffff',
                            textAlign: 'center',
                            fontSize: height * 0.025,
                            borderRadius: 8
                        }
                    });
                    btnWeixinUser.onTap(function(res) {//响应回调，获取信息
                        _this.getUserData(res)
                    });
                }
            });
        } 
    },
    // update (dt) {},
});
