// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        draw_box1:{
            type:cc.Graphics,
            default:null
        },
        draw_box2:{
            type:cc.Graphics,
            default:null
        },
        draw_box3:{
            type:cc.Graphics,
            default:null
        },
        draw_box4:{
            type:cc.Graphics,
            default:null
        },
        draw_t:{
            type:cc.Node,
            default:null
        },
        draw_Data:{
            type:[Object],
            default:[]            
        },

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
        this.drawwing()
    },

    start () {
        
    },
    drawStart(e){
        this.draw_ok = true
        this.draw_moveTo = e.getLocation()
        let x = e.getLocation().x-this.draw_t.width/2
        let y = e.getLocation().y-this.draw_t.height/2
        
        this.draw_Data.push({moveTo:cc.v2(x,y),lineTo:''})  
        // this.draw_Data.push({moveTo:cc.v2(e.getLocation().x-this.draw_t.width/2,e.getLocation().y-this.draw_t.height/2),lineTo:''})  
        // console.log(e.getLocation().x-this.draw_t.width/2,e.getLocation().y-this.draw_t.height/2)
        // console.log(e.getLocation().x-this.draw_t.width/2,(e.getLocation().y-this.draw_t.height/2)*2)
        // console.log(e.getLocation().x-this.draw_t.width/2,(e.getLocation().y-this.draw_t.height/2)*2)
        let r = Math.sqrt((x-0)*(x-0)+(y-0)*(y-0))
        let s2 =cc.v2(r/Math.sin(45),y)
        let s3 =cc.v2(r/Math.sin(45),r/Math.sin(45))
        let s4 =cc.v2(x,r/Math.sin(45)) 
        // this.draw_box1.moveTo(x,y)
        // this.draw_box2.moveTo(s2.x,s2.y)
        // this.draw_box3.moveTo(s3.x,s3.y)
        // this.draw_box4.moveTo(s4.x,s4.y)

        // this.draw_box1.lineTo(0,0)
        // this.draw_box2.lineTo(0,0)
        // this.draw_box3.lineTo(0,0)
        // this.draw_box4.lineTo(0,0)

        for(var i=0;i<4;i++){
            let va = this.calculateXY(x,y)[i]
            this['draw_box'+(i+1-0)].moveTo(va.x,va.y)
            console.log()
        }
    },
    // 计算对称
    calculateXY(x,y){
        let r = Math.sqrt((x-0)*(x-0)+(y-0)*(y-0)) // 半径
        let s1 = cc.v2(x,y)
        let s2 = cc.v2(-x,-y)
        let s3 = cc.v2(-x,y)
        let s4 = cc.v2(x,-y)

        return [s1,s2,s3,s4]
    },
    drawMove(e){
        // console.log(e.getLocation().y-this.draw_t.y-350<=100&&e.getLocation().y-this.draw_t.y-350>=-100)
        // if(e.getLocation().y-this.draw_t.y-350<=100&&e.getLocation().y-this.draw_t.y>=-100){
            
            // this.draw_box1.lineTo(e.getLocation().x-this.draw_t.width/2,e.getLocation().y-this.draw_t.height/2)
            // this.draw_box1.stroke()
        // }
        // console.log(e.getLocation().x,e.getLocation().y)

        for(var i=0;i<4;i++){
            let va = this.calculateXY(e.getLocation().x-this.draw_t.width/2,e.getLocation().y-this.draw_t.height/2)[i]
            this['draw_box'+(i+1-0)].lineTo(va.x,va.y)
            this['draw_box'+(i+1-0)].stroke()
        }
    },
    drawEnd(e){
        this.draw_ok = false
        // console.log(e)
        // this.draw_box.lineTo(e.getLocation().x,e.getLocation().y-this.node.getChildByName('draw').x-350-this.node.getChildByName('draw').height)
        // // this.draw_box.lineTo(100,200)
        // // console.log(e.getLocation().x,e.getLocation().y-this.node.getChildByName('draw').x-350-this.node.getChildByName('draw').height/2)
        // this.draw_box.stroke()
    },
    drawCancel(e){
        this.draw_ok = false
    },
    drawwing(){
        this.draw_t = this.node.getChildByName('draw_b_box').getChildByName('draw')
        this.draw_box1 =this.node.getChildByName('draw_b_box').getChildByName('draw').getComponent(cc.Graphics);
        this.draw_box2 =this.node.getChildByName('draw_b_box').getChildByName('draw2').getComponent(cc.Graphics);
        this.draw_box3 =this.node.getChildByName('draw_b_box').getChildByName('draw3').getComponent(cc.Graphics);
        this.draw_box4 =this.node.getChildByName('draw_b_box').getChildByName('draw4').getComponent(cc.Graphics);

        // this.draw_box2.moveTo(7,337)
        // this.draw_box2.lineTo(0,0)
        // this.draw_box2.stroke()
        this.draw_t.on('touchstart',this.drawStart,this)
        this.draw_t.on('touchmove',this.drawMove,this)
        this.draw_t.on('touchend',this.drawEnd,this)
        this.draw_t.on('touchcancel',this.drawCancel,this)


        // ctx.fill();
    },
    // update (dt) {},
});
