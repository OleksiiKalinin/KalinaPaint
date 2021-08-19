import Tool from "./Tool";

class Line extends Tool {
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
                    type: 'line',
                    x: this.startX,
                    y: this.startY,
                    x2: this.currentX,
                    y2: this.currentY,
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
            this.currentX = e.pageX - e.target.offsetLeft;
            this.currentY = e.pageY - e.target.offsetTop;
            this.rerender(this.startX, this.startY, this.currentX, this.currentY);
        }
    }

    rerender(x1, y1, x2, y2) {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
        }
    }

    static draw(ctx, x1, y1, x2, y2, color, lineWidth, strokeStyle) {
        let tempColor = ctx.fillStyle; 
        let tempStroke = ctx.strokeStyle;
        let tempWidth = ctx.lineWidth;
        
        ctx.fillStyle = color;
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.fillStyle = tempColor;
        ctx.strokeStyle = tempStroke;
        ctx.lineWidth = tempWidth;
    }
}

export default Line;