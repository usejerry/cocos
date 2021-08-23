// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        userInfo_name :{
            type:cc.Label,
            default:null
        },
        userInfo_head_img :{
            type:cc.Sprite,
            default:null
        },
        bg:{
            type:cc.Node,
            default:null
        },
        zt:{
            type:[cc.SpriteFrame],
            default:[]
        },
        games:{
            type:cc.Node,
            default:null
        },
        draw_box:{
            type:cc.Graphics,
            default:null
        },
        draw_moveTo:{
            type:cc.v2,
            default:null
        },
        draw_lineTos:{
            type:[cc.v2],
            default:[]            
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
    go_scence(data){
        this.node.runAction(cc.fadeOut(1.0));
        cc.director.loadScene('game_show')
    },
    onLoad () {
        this.setBgImg()
        this.drawwing()
    },
    setBgImg(){
        let z_y =parseInt(this.node.height/33)
        let z_x = this.node.width/100
        // for(let j=0;j<4;j++){
        //     var s = new cc.Node('zt'+'-'+j)
        //     var sprite =s.addComponent(cc.Sprite)
        //     sprite.sizeMode = 'custom'
        //     s.width = 100
        //     s.height = 33
            
        //     // s.setPosition(cc.v2(200-j*100-50,350-16.5-0*33))
        //     s.setPosition(cc.v2(200-50,350-16.5-0*33))
        //     cc.tween(s).to(.1*j+1,{position:cc.v2(200-j*100-50,350-16.5-0*33)}).start()
        //     sprite.spriteFrame = this.zt[Math.floor(Math.random()*3)]
        //     this.bg.addChild(s)
        // }
        for(let i=0;i<=z_y;i++){
            if(i%2==0){
                for(let j=0;j<4;j++){
                    var s = new cc.Node('zt'+i+'-'+j)
                    var sprite =s.addComponent(cc.Sprite)
                    sprite.sizeMode = 'custom'
                    s.width = 100
                    s.height = 33
                    s.setPosition(cc.v2(0,0))
                    // s.setPosition(cc.v2(200-j*100-50,350-16.5-i*33))
                    cc.tween(s).to(1,{position:cc.v2(200-j*100-50,350-16.5-i*33)}).start()
                    sprite.spriteFrame = this.zt[Math.floor(Math.random()*3)]
                    this.bg.addChild(s)
                }
            }else{
                for(let j=0;j<5;j++){
                    var s = new cc.Node('zt'+i+'-'+j)
                    var sprite =s.addComponent(cc.Sprite)
                    sprite.sizeMode = 'custom'
                    s.width = 80
                    s.height=33       
                    s.setPosition(cc.v2(0,0))
                    // s.setPosition(cc.v2(200-j*80-40,350-16.5-i*33))            
                    cc.tween(s).to(1,{position:cc.v2(200-j*80-40,350-16.5-i*33)}).start() 
                    sprite.spriteFrame = this.zt[Math.floor(Math.random()*3)]
                    this.bg.addChild(s)
                }
            }
        }

    },
    drawStart(e){
        this.draw_moveTo = e.getLocation()
        // this.draw_box.moveTo(e.getLocation().x,e.getLocation().y)
        this.draw_box.moveTo(0,0)

        console.log(e.getLocation().x-this.node.getChildByName('draw').width/2,
        e.getLocation().y-this.node.getChildByName('draw').y-350)
    },
    drawMove(e){
        this.draw_box.lineTo(e.getLocation().x-this.node.getChildByName('draw').width/2,e.getLocation().y-this.node.getChildByName('draw').y-350)
        this.draw_box.stroke()
        // console.log(e.getLocation().x,e.getLocation().y)
    },
    drawEnd(e){
        // console.log(e)
        // this.draw_box.lineTo(e.getLocation().x,e.getLocation().y-this.node.getChildByName('draw').x-350-this.node.getChildByName('draw').height)
        // // this.draw_box.lineTo(100,200)
        // // console.log(e.getLocation().x,e.getLocation().y-this.node.getChildByName('draw').x-350-this.node.getChildByName('draw').height/2)
        // this.draw_box.stroke()
    },
    drawwing(){
        this.draw_box =this.node.getChildByName('draw').getComponent(cc.Graphics);
        console.log(this.draw_box)
        this.draw_box.moveTo(100,100)
        this.draw_box.lineTo(0,0)
        this.draw_box.stroke()
        this.node.getChildByName('draw').on('touchstart',this.drawStart,this)
        this.node.getChildByName('draw').on('touchmove',this.drawMove,this)
        this.node.getChildByName('draw').on('touchend',this.drawEnd,this)
        // this.node.getChildByName('draw').on('touchcancel',this.drawStart,this)


        // ctx.fill();
    },
    start () {
        this.wx_login()
    },
    getUserData(data){
        let _this = this
        this.userInfo_name.string = data.userInfo.nickName; 
                    
        cc.loader.load({url: data.userInfo.avatarUrl, type: 'png'}, function(err,img){    
            var myIcon  = new cc.SpriteFrame(img);      
            _this.userInfo_head_img.spriteFrame = myIcon; 
        
        }); 

    },
    wx_login() {
        let _this  = this
        if (window.wx) {//确定是在微信真机环境下
            let sysInfo = wx.getSystemInfoSync();
            //获取微信界面大小
            let width = sysInfo.screenWidth;
            let height = sysInfo.screenHeight;

            wx.getUserInfo({
                success: function(data) {
                    console.log(data,55)
                    _this.getUserData(data)
                },
                fail:function(err){
                   let  btnWeixinUser = wx.createUserInfoButton({//定义按钮样式
                        type: 'text',
                        text: '',
                        style: {
                            left: 0,
                            top: 0,
                            width: width,
                            height: height,
                            lineHeight: height,
                            background: '#00000000',
                            color: '#ffffff',
                            textAlign: 'center',
                            fontSize: height * 0.025,
                            borderRadius: 8
                        }
                    });
                    btnWeixinUser.onTap(function(res) {//响应回调，获取信息
                        _this.getUserData(res)
                    });
                }
            });
        } 
    },
    
    // update (dt) {},
});
    