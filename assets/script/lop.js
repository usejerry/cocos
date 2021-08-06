// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        startGame:false,
        speed:5,
        direction:cc.v2(0,0)
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.systemEvent.on('keydown',this.onkeypress,this)
    },
    onkeypress(e){
        console.log(e.keyCode)
        switch (e.keyCode) {
            case cc.macro.KEY.left:
                this.direction = cc.v2(-1,0)
                break;
            case cc.macro.KEY.right:
                // console.log("right")
                this.direction = cc.v2(1,0)
                break;  
            case cc.macro.KEY.up:
                this.direction = cc.v2(0,1)
                break;
            case cc.macro.KEY.down:
                this.direction = cc.v2(0,-1)
                break;     
            case 32:
                this.direction = cc.v2(0,0)
                break;     
            default:
                break;
        }
    },
    start () {

    },

    update (dt) {
        if(this.startGame){
            
            let x = this.node.getPosition().x +=this.speed*this.direction.x;
            let y = this.node.getPosition().y +=this.speed*this.direction.y;

            this.node.setPosition(cc.v2(x,y))
        }
    },
});
