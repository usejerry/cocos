// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        tips:cc.Label,
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
    clearCallback:function(){
        this.setTips("");
        this.setOkCallback();
        this.setCancelCallback();
        this.setCloseCallback();
    },
    show:function(tips,okCallback,cancelCallback,closeCallback){
        this.clearCallback();
        this.node.active = true;
        this.setTips(tips);
        this.setOkCallback(okCallback);
        this.setCancelCallback(cancelCallback);
        this.setCloseCallback(closeCallback);
    },

    // update (dt) {},
    onClickOk:function(){
        cc.log("ok event");
        this.node.active = false;
        if(this.m_OkCallback != null){
            this.m_OkCallback();
        }
    },
    onClickCancel:function(){
        cc.log("cancel event");
        this.node.active = false;

        if(this.m_CancelCallback != null){
            this.m_OkCallback();
        }
    },
    onClickClose:function(){
        cc.log("close event");
        this.node.active = false;
        if(this.m_CloseCallback != null){
            this.m_CloseCallback();
        }
    },

    setTips:function(tips){
        if(tips == "" || tips == undefined){
            tips= "默认的提示信息！"    
        }
        this.tips.string = tips;
    },

    //设置回调函数
    setOkCallback:function(callback){
        this.m_OkCallback = callback;
    },
    setCloseCallback:function(callback){
        this.m_CloseCallback = callback;
    },
    setCancelCallback:function(callback){
        this.m_CancelCallback = callback;
    },
    // onLoad () {},
    click_no(){
       this.node.destroy();
    },
    click_yes(){
        this.node.destroy();
    },
    start () {

    },

    // update (dt) {},
});
