class Car {
    constructor(Canvas) {
        if(Car.instance) {
            return Car.instance;
        }
        Car.instance = this;
        this.canvas = Canvas.canvas
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.width = 50;
        this.height = 50;

        Canvas.objs.push(this);
    }

    drive(direction){
        if(direction === "up") {
            this.y -= this.speed;
        }
        if(direction === "down") {
            this.y += this.speed;
        }
        if(direction === "left") {
            this.x -= this.speed;
        }
        if(direction === "right") {
            this.x += this.speed;
        }
    }

    display(canvas, ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    onClick(e){
        console.log("Car check");
        if(!this.onRay(e)) return;
        console.log("Car clicked");
    }

    onRay(e){
        if(e.offsetX > this.x && e.offsetX < this.x + this.width && e.offsetY > this.y && e.offsetY < this.y + this.height){
            return true;
        }
        return false;
    }

}

class Controller {
    constructor(canvas, x,y) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        window.onkeydown = (e) => {
            this.driveCar(e.key);
        }
    }

    connect(car) {
        this.car = car;
    }

    driveCar(direction) {
        console.log(direction)
        this.car.drive(direction);
    }

    display(canvas, ctx) {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.width, this.height);  
        if(this.car) {
            this.drawConnectline(ctx);
        }
    }

    drawConnectline(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x + this.width/2, this.y + this.height/2);
        ctx.lineTo(this.car.x + this.car.width/2, this.car.y + this.car.height/2);
        ctx.stroke();  
    }

    onClick(e){
        if(!this.onRay(e)) return;
        console.log("Controller clicked");
        const car = new Car(this.canvas);
        this.connect(car);
    }

    onRay(e){
        if(e.offsetX > this.x && e.offsetX < this.x + this.width && e.offsetY > this.y && e.offsetY < this.y + this.height){
            return true;
        }
        return false;
    }
}

const init = (Canvas) => {
    const canvas = Canvas.canvas;
    const button = document.createElement("button");
    button.innerHTML = "컨트롤러 추가";
    button.style.position = "absolute";
    button.style.top = "100px"; 
    button.style.right = "100px"; 
    button.style.width = "100px";
    button.style.height = "50px";

    button.onclick = () => {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        const controller = new Controller(Canvas, x,y)
        Canvas.objs.push(controller);
    }
    document.body.appendChild(button);
}

const loop = (Canvas) => {

}

export default {
    init,
    loop
}
