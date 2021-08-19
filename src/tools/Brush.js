import Tool from "./Tool";

class Brush extends Tool {
    constructor(canvas, socket, id, isEraser) {
        super(canvas, socket, id);
        this.isEraser = isEraser;
        this.canvas.onmousemove = this.mouseMoveHadler.bind(this);
        this.canvas.onmouseup = this.finishDraw.bind(this);
        this.canvas.onmousedown = this.mouseDownHadler.bind(this);
        this.canvas.onmouseleave = this.finishDraw.bind(this);
    }

    finishDraw = () => {
        this.mouseDown = false;
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'finish'
            }
        }));
    }

    mouseDownHadler(e) {
        this.mouseDown = true;
        this.ctx.beginPath();
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    }

    mouseMoveHadler(e) {
        if(this.mouseDown) {
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'brush',
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                    color: this.ctx.fillStyle,
                    lineWidth: this.ctx.lineWidth,
                    strokeStyle: this.ctx.strokeStyle,
                    isEraser: this.isEraser
                }
            }));
        }
    }

    static draw(ctx, x, y, color, lineWidth, strokeStyle, isEraser) {
        let tempColor = ctx.fillStyle; 
        let tempStroke = ctx.strokeStyle;
        let tempWidth = ctx.lineWidth;
        
        if(isEraser) {
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'white';
        } else {
            ctx.fillStyle = color;
            ctx.strokeStyle = strokeStyle;
        }
        ctx.lineWidth = lineWidth;
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = tempColor;
        ctx.strokeStyle = tempStroke;
        ctx.lineWidth = tempWidth;
    }
}

export default Brush;