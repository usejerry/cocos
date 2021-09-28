let ca_web = cc.Class({
    extends: require('./textureRenderUtils'),

    start () {

        this.init();
    },

    captureImg() {
        // create capture
        this.createCanvas();
        var img = this.createImg();
        this.scheduleOnce(() => {
            // this.showImage(img);
            // download the pic as the file to your local
            // this.label.string = 'Showing the capture'
            this.showImage(img);
        }, 1);
    },

    closeImg() {
        this.hideImg();
    },
});

module.exports={
    ca_web
  };