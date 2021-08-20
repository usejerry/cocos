// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
// let alert = require('alert');

cc.Class({
    extends: cc.Component,

    properties: {
        dialog:{
            default:null,
            type:cc.Prefab
        },
        button: cc.Button,
        log:null,
        mySpr:cc.Sprite,
        showRule:cc.Button
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.button.on('click'.this.callback,this)
        // alert.show.call(this, "确认退出游戏？", "取消", "确认", function (type) {
        //     if (type == "取消") {
        //         console.log("取消");
        //     }
        //     if (type == "确认") { 
        //         console.log("确认");
        //     }
        // });
        window.HttpHelper.httpGet('https://mockapi.eolinker.com/y7UHLDN88b3725cb8a379757bf303f2ab477f0fa56905b8/rtsiii/tag/user_tag',(data)=>{
            console.log(data)
        })
        // console.log(window.HttpHelper)
    },
    show_rule(){
        this.show_log()
    },
    show_log(){
        let log = cc.instantiate(this.dialog)
        this.node.addChild(log) 
        log.setPosition(cc.v2(20,30))
        var scriptComponent = log.getComponent("dialog");
        console.log(scriptComponent)
        // scriptComponent.show("是否进入副本？",function(){
        //     cc.log("OK 回调函数")
        // },function(){
        //     cc.log("Cancel 回调函数")
        // },function(){
        //     cc.log("Close 回调函数")
        // });
        scriptComponent.setTips("错误")
    },
    goOne:function(button){
        this.node.runAction(cc.fadeOut(1.0));
        cc.director.loadScene('two_scene')

    },
    goTwo:function(button){
        console.log(button)
        if (window.wx) {//确定是在微信真机环境下
            wx.getSystemInfo({
                success: function(data) {
                    btnWeixinUser = wx.createUserInfoButton({//定义按钮样式
                        type: 'text',
                        text: '微信授权',
                        style: {
                            opacity: 0,
                            left: data.screenWidth * 0.2,
                            top: data.screenHeight * 0.73,
                            width: data.screenWidth * 0.65,
                            height: data.screenHeight * 0.07,
                            lineHeight: data.screenHeight * 0.07,
                            background: '#fe714a',
                            color: '#ffffff',
                            textAlign: 'center',
                            fontSize: data.screenHeight * 0.025,
                            borderRadius: 8
                        }
                    });
                    btnWeixinUser.onTap(function(res) {//响应回调，获取信息
                        nickName = res.userInfo.nickName;
                        var url = res.userInfo.avatarUrl;
                        console.log(res)
                    });
                }
            });
        } 
        cc.director.loadScene('game_show')
    },
    // update (dt) {},
    start(){
        let btnWeixinUser =null
        let nickName = ''
    }
});
