

export default class Canvas{

    objs = []

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
        window.addEventListener("click", (e) => {
            this.objs.forEach(obj => obj.onClick(e));
        })
    }

    dispose(){
        window.removeEventListener("resize", () => this.setSize());
    }

    newScene(init, loop){
        this.init = init;
        this.loop = loop;
        this.init(this);
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
        this.loop(this);
        this.display();

        window.requestAnimationFrame(() => this.anim());
    }

    drawBackground(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    initAnim(){
        this.anim();
    }

    display(){
        this.objs.forEach(obj => obj.display(this.canvas,this.ctx));
    }
}


