

export default class Canvas{
    constructor(){
        if(Canvas.instance){
            return Canvas.instance;
        }

        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        if(!this.canvas){
            console.log("Canvas not found");
            return;
        }
        Canvas.instance = this;

        this.frameInterval = 1000 / 60;
        this.currentTime, this.deltaTime;
        this.previousTime = performance.now();
        this.setSize();
        this.newScene(() => {}, () => {});
        window.addEventListener("resize", () => this.setSize());
    }

    dispose(){
        window.removeEventListener("resize", () => this.setSize());
    }

    newScene(init, loop){
        console.log(init, loop);
        this.init = init;
        this.loop = loop;
        this.init(this.canvas, this.ctx);
        window.requestAnimationFrame(() => this.anim());
    }

    setSize(){
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
    }

    anim(){
        this.currentTime = performance.now();
        this.deltaTime = this.currentTime - this.previousTime;
        if(this.deltaTime < this.frameInterval){
            window.requestAnimationFrame(() => this.anim());
            return;
        }
        this.previousTime = this.currentTime;

        this.drawBackground();
        this.loop(this.canvas, this.ctx);

        window.requestAnimationFrame(() => this.anim());
    }

    drawBackground(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    initAnim(){
        this.anim();
    }
}


