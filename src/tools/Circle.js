import Tool from "./Tool";

class Circle extends Tool {
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.drawing = false;
        this.canvas.onmousemove = this.mouseMoveHadler.bind(this);
        this.canvas.onmouseup = this.finishDraw.bind(this);
        this.canvas.onmousedown = this.mouseDownHadler.bind(this);
        this.canvas.onmouseleave = this.finishDraw.bind(this);
    }

    finishDraw = () => {
        this.mouseDown = false;
        if(this.drawing)
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'circle',
                    x: this.startX,
                    y: this.startY,
                    radius: this.radius,
                    color: this.ctx.fillStyle,
                    lineWidth: this.ctx.lineWidth,
                    strokeStyle: this.ctx.strokeStyle
                }
            }));
        this.drawing = false;
    }

    mouseDownHadler(e) {
        this.mouseDown = true;
        this.ctx.beginPath();
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
        this.saved = this.canvas.toDataURL();
    }

    mouseMoveHadler(e) {
        if(this.mouseDown) {
            this.drawing = true;
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            this.radius = Math.sqrt(Math.pow(currentX - this.startX, 2) + Math.pow(currentY - this.startY, 2));
            this.rerender(this.startX, this.startY, this.radius);
        }
    }

    rerender(x, y, radius) {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.stroke();
        }
    }
    
    static draw(ctx, x, y, radius, color, lineWidth, strokeStyle) {
        let tempColor = ctx.fillStyle; 
        let tempStroke = ctx.strokeStyle;
        let tempWidth = ctx.lineWidth;
        
        ctx.fillStyle = color;
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = tempColor;
        ctx.strokeStyle = tempStroke;
        ctx.lineWidth = tempWidth;
    }
}

export default Circle;