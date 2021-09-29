cc.Class({
    extends: cc.Component,

    properties: {
        camera: cc.Camera,
        // label: cc.Label,
        captureRoot : cc.Node,
        _canvas: null
    },

    init () {
        // this.label.string = '';
        let texture = new cc.RenderTexture();
        // texture.initWithSize(this.captureRoot.width, this.captureRoot.height, cc.gfx.RB_FMT_S8);
        texture.initWithSize(this.captureRoot.width, this.captureRoot.height, cc.gfx.TEXTURE_FMT_RGB8);
        this.camera.targetTexture = texture;
        this.texture = texture;
    },
    // create the img element
    createImg () {
        // return the type and dataUrl
        var dataURL = this._canvas.toDataURL("image/png");
        this._img = new Image();
        // if (this._img == undefined) {
        //     this._img = document.createElement("img");
        //     this._img.setAttribute("id","capture_img");
        //     this._img.alt = 'bigImg';
        //     this._img.style.opactiy = 1;

        //     var b = cc.view.getFrameSize()
        //     console.log(b)
        //     var bx = b.width
        //     var by = b.height

        //     var ratio = bx / this.texture.width;


        //     // this._img.width = bx;
        //     // this._img.height = Math.floor(this.texture.height * ratio);
        //     this._img.width = this.captureRoot.width;
        //     this._img.height = this.captureRoot.height            
        //     var iy = Math.floor(60 * ratio);

        //     this._img.style.position = 'absolute';
        //     this._img.style.top = "" + 10 + "px";//y坐标
        //     this._img.style.left = "50%";//设置图片居中显示
        //     this._img.style.transform = 'translateX(-50%)'
        // }
        this._img.src = dataURL;

        return this._img;
    },
    // create the canvas and context, filpY the image Data
    createCanvas () {
        let width = this.texture.width;
        let height = this.texture.height-50;
        if (!this._canvas) {
            this._canvas = document.createElement('canvas');

            this._canvas.width = width;
            this._canvas.height = height;
        }
        else {
            this.clearCanvas();
        }
        let ctx = this._canvas.getContext('2d');
        this.camera.render();
        let data = this.texture.readPixels();
        // write the render data
        let rowBytes = width * 4; 
        for (let row = 0; row < height; row++) {
            let srow = height - 1 - row;
            let imageData = ctx.createImageData(width, 1);
            let start = srow * width * 4;
            for (let i = 0; i < rowBytes; i++) {
                // if ((i - 3) % 4 == 0) {
                //     // cc.log ("i " + i + " data " + data[start + i]);
                //     // imageData.data[i] = 255;
                // } else {
                //     imageData.data[i] = data[start + i];
                // }
                imageData.data[i] = data[start + i];
            }

            ctx.putImageData(imageData, 0, row);
        }
        return this._canvas;
    },
    
    // show on the canvas
    showImage (img) {

        if (this._gameDiv == undefined) {
            // this._gameDiv = document.getElementById('Cocos2dGameContainer');//获取div元素
            // console.log(img)
            // img.style.visibility = "visible";
            // this._gameDiv.appendChild(img);  
        } else {
            img.style.visibility = "visible";
        }
    },
    hideImg() {
        if (this._img == undefined) {
            return;
        }
        this._img.style.visibility = "hidden";
    },
    // sprite action
    captureAction (capture, width, height) {
        let scaleAction = cc.scaleTo(1,0.3);
        let targetPos = cc.v2(width - width / 6,  height / 4);
        let moveAction = cc.moveTo(1, targetPos); 
        let spawn = cc.spawn(scaleAction, moveAction);
        // capture.runAction(spawn);
        capture.runAction(scaleAction);
        let blinkAction = cc.blink(0.1, 1);
        // scene action
        this.node.runAction(blinkAction);
    },

    clearCanvas () {
        let ctx = this._canvas.getContext('2d');
        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
});