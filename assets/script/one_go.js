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
        cc.director.loadScene('two_scene')

    },
    goTwo:function(button){
        cc.director.loadScene('one_scene')
    },
    // update (dt) {},
});
