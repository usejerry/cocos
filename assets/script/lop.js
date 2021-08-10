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
    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact: function (contact, selfCollider, otherCollider) {
        console.log(22222)
    },
    onCollisionEnter: function (other, self) {
        console.log(other,1);
        console.log(self,2);

    
        // 碰撞系统会计算出碰撞组件在世界坐标系下的相关的值，并放到 world 这个属性里面
        var world = self.world;
    
        // 碰撞组件的 aabb 碰撞框
        var aabb = world.aabb;
    
        // 节点碰撞前上一帧 aabb 碰撞框的位置
        var preAabb = world.preAabb;
    
        // 碰撞框的世界矩阵
        var t = world.transform;
    
        // 以下属性为圆形碰撞组件特有属性
        var r = world.radius;
        var p = world.position;
    
        // 以下属性为 矩形 和 多边形 碰撞组件特有属性
        var ps = world.points;
    },
    // 只在两个碰撞体结束接触时被调用一次
    onEndContact: function (contact, selfCollider, otherCollider) {
    },
    
    // 每次将要处理碰撞体接触逻辑时被调用
    onPreSolve: function (contact, selfCollider, otherCollider) {
    },
    
    // 每次处理完碰撞体接触逻辑时被调用
    onPostSolve: function (contact, selfCollider, otherCollider) {
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
