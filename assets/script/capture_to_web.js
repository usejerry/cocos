let ca_web = cc.Class({
    extends: require('./textureRenderUtils'),

    start () {

        this.init();
    },

    captureImg() {
        // create capture
        this.createCanvas();
        var img = this.createImg();
        let texture = new cc.Texture2D();
        texture.initWithElement(img);
        texture.handleLoadedTexture();
         let spriteFrame_2 = new cc.SpriteFrame(texture);
        var node=new cc.Node('myNode')
        //调用新建的node的addComponent函数，会返回一个sprite的对象
        const sprite=node.addComponent(cc.Sprite)
        //给sprite的spriteFrame属性 赋值
        sprite.spriteFrame=spriteFrame_2

        //把新的节点追加到self.node节点去。self.node，就是脚本挂载的节点

        // this.node.addChild(node)
        return node
        // this.scheduleOnce(() => {
        //     // this.showImage(img);
        //     // download the pic as the file to your local
        //     // this.label.string = 'Showing the capture'
        //     this.showImage(img);
        // }, 1);
    },

    closeImg() {
        this.hideImg();
    },
});

module.exports={
    ca_web
  };