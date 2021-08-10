// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        lop: {
            default: null,
            type: cc.Node
        },
        startBtn:{
            default:null,
            type:cc.Node
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
        let p = cc.director.getCollisionManager()
        p.enabled = true
        // p.enabledDebugDraw = true;
        // p.gravity = cc.v2(0,0)
    },
    start () {

    },
    onStartGame(){
        let isok =  this.lop.getComponent('lop').startGame
        let start = this.node.getChildByName('start').getChildByName('Background').getChildByName('Label').getComponent(cc.Label)
        console.log(start)
        if(isok){
            this.lop.getComponent('lop').startGame = false
            start.string = '暂停'
        }else{
            this.lop.getComponent('lop').startGame = true
            start.string = '开始'
        }
        // console.log(this.lop.startGame)
        // let n_y = coures1.getPosition().y
        // console.log(coures1.getPosition().x)
        // cc.tween(coures1)
        // .to(1, { position: cc.v2(coures1.getPosition().x, 180), rotation: 360 })
        // .to(1, { scale: 1 ,rotation: -360})
        // .to(1, {scale:.5,position: cc.v2(coures1.getPosition().x, n_y), rotation: 360 })
        // .start()

    }
    // update (dt) {},
});
