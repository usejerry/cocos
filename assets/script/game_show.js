// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
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
        target_go:{
            type:cc.Sprite,
            default:null
        },
        time_label:{
            type:cc.Label,
            default:null
        },
        percentage_label:{
            type:cc.Label,
            default:null
        },
        count:'01:00:00',
        time_over:false,
        count_time:100,
        time_co:null,
        blood:100
    },
	//倒计时
	countDown(time){
		var date = new Date();
		var now = date.getTime();               
		var endDate = time;//设置截止时间
		var end = endDate.getTime();
		var leftTime = end - now; //时间差                        
		var d, h, m, s, ms;
		if(leftTime > 0) {
			m = Math.floor(leftTime / 1000 / 60 % 60);
			s = Math.floor(leftTime / 1000 % 60);
			ms = Math.floor(leftTime % 60);
			if(ms < 10) {
				ms = "0" + ms;
			}
			if(s < 10) {
				s = "0" + s;
			}
			if(m < 10) {
				m = "0" + m;
			}
			this.count =  m + ":" + s + ":"+  ms
            this.time_label.string = this.count
			this.count_time = Math.ceil(leftTime/60000*100)
            this.percentage_label.string = this.count_time+'%'
			//将倒计时赋值到div中
		} else {
			this.count_time = 0
			this.count = "00:00:00"
			this.time_over = true
            this.time_label.string = this.count
            this.percentage_label.string = this.count_time+"%"
			//将倒计时赋值到div中
		}
		//递归每秒调用countTime方法，显示动态时间效果
	   return leftTime
	},
    // LIFE-CYCLE CALLBACKS:
    onDeviceOrientationChangeEvent(data){
        console.log(data)
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
	// 目标随机运动
	targetMove(){
		let _this = this
		let time_interval = Math.floor(Math.random()*(1000 - 3000) + 3000)
		let time = setTimeout(() => {
            cc.tween(this.target_go.node).to(.5,{position:cc.v2(Math.floor(Math.random()*(-70 - 70) + 70),Math.floor(Math.random()*(-40 - 10) + 10))}).start()
			if(_this.blood <= 0 || this.count_time == 0){
				clearTimeout(time)
			}else{
				_this.targetMove()
			}
		}, time_interval);
		// console.log(time_interval)	
	},
    onLoad () {
        let p = cc.director.getCollisionManager()
        p.enabled = true
        let _this = this
        var endTime = new Date(new Date().getTime() + 60000)  //下一分钟
        this.time_co = setInterval(function (){
            var dates =  _this.countDown(endTime);
             if(dates<=0) {
                 clearInterval(_this.time_co)
             }
     },50)
     this.getGyroscope()
     this.targetMove()
    },

    start () {

    },

    update (dt) {
    },
});
