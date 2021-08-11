
cc.Class({
    extends: cc.Component,

    properties: {

    },


    onLoad () {
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
    onCollisionStay: function (other, self) {
        console.log('on collision stay');
        this.node.getChildByName('boom_lock').scale = 1
        // cc.tween(this.node.getChildByName('boom_lock').getComponent(cc.Node)).to(.2,{scale:1.5}).start()
    },
    onCollisionExit: function (other, self) {
        this.node.getChildByName('boom_lock').scale = .8
        // cc.tween(this.node.getChildByName('boom_lock').getComponent(cc.Node)).to(.2,{scale:.8}).start()
    },
    start () {

    },

    // update (dt) {},
});
