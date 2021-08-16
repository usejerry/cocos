
cc.Class({
    extends: cc.Component,

    properties: {
        game_show:null,
        target_go_h:{
            default:null,
            type:cc.SpriteFrame
        },
        target_go_t:{
            default:null,
            type:cc.SpriteFrame
        },
        isOk:false,
        toX: 0,
        toY:0,
        span_h: 5.625,
        span_w: 0,
        toch_x:0,
        toch_y:0,
        start_ealpha:0,
        start_ebeta:0,
    },
    // LIFE-CYCLE CALLBACKS:
		// 陀螺仪扭动
	onDeviceOrientationChangeEvent(event){
		let leftData = parseInt((event.gamma||0))   // alpha  //gamma
		let topData = parseInt((event.beta||0))
		// this.beta = topData
		// this.gamma = leftData
        if(Math.abs(leftData - this.start_ealpha) > 50 ){
				this.isOk = false
		}
		if(!this.isOk){
				// 7.10 start
		        if(leftData >= -89 && leftData < 0){      // 2    4    6
					leftData = leftData + 180 - ((90+leftData)*2)  // 91  92 93                  34 - 32 > 0 左     32 - 34 <0 右              -32 - -34 
				}else if(leftData <= 90 && leftData > 0){// 89  88 87 
					leftData = leftData - 180 + ((90-leftData)*2)             
				}else if(leftData == 0 || leftData == 40 || leftData == -40){                    
					this.isOk = true
				}
		}else{
			if(topData > 0 && topData < 90 &&  leftData > -25 && leftData < 25 ){
				this.toX = parseInt( -leftData * this.span_w );
				if(topData * this.span_h<250 - 92.5+10){
					this.toY = parseInt( -topData * this.span_h);
				}
				// if(this.isTouch){
				// 	this.toY = parseInt( -topData * this.span_h);
				// }
				this.toch_x = this.toX;
				this.toch_y = this.toY;
			}			
		}
		this.start_ealpha =leftData
		this.start_ebeta = topData
	},
	// 获取陀螺仪权限
	getGyroscope(){
        console.log(this.target_go)
		let _this = this
		if ( window.DeviceOrientationEvent !== undefined && typeof window.DeviceOrientationEvent.requestPermission === 'function') {
			window.DeviceOrientationEvent.requestPermission().then( function ( response ) {
				if ( response == 'granted' ) {
					window.addEventListener( 'deviceorientation', _this.onDeviceOrientationChangeEvent, false );
				} else if( response == 'denied' ) {
				}
			} ).catch( function ( error ) {
			} );
		} else {
			window.addEventListener( 'deviceorientation', _this.onDeviceOrientationChangeEvent, false );
		}
	},

    onLoad () {
        // this.getGyroscope()
    },
    onCollisionEnter: function (other, self) {
        // console.log(other,1);
        // console.log(self,2);
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
        this.node.getChildByName('boom_lock').scale = .9
        this.game_show.target_go.spriteFrame = this.target_go_h
        // cc.tween(this.node.getChildByName('boom_lock').getComponent(cc.Node)).to(.2,{scale:1.5}).start()
    },
    onCollisionExit: function (other, self) {
        this.node.getChildByName('boom_lock').scale = 1
        this.game_show.target_go.spriteFrame = this.target_go_t

        // cc.tween(this.node.getChildByName('boom_lock').getComponent(cc.Node)).to(.2,{scale:.8}).start()
    },
    start () {

    },
    update (dt) {
        // _this.egammaData = _this.egammaData+(_this.toX -_this.egammaData)*0.1
        // _this.ebetaData = _this.ebetaData+(_this.toY -_this.ebetaData)*0.1
    },
});
