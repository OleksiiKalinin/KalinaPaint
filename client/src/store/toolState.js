import { makeAutoObservable } from "mobx";

class ToolState {
    tool = null;
    strokeStyle = '#000000'; 
    
    constructor() {
        makeAutoObservable(this);
    }

    setTool(tool) {
        this.tool = tool;
    }

    setFillColor(color) {
        this.tool.fillColor = color;
    }

    setStrokeColor(color) {
        this.strokeStyle = color;
        this.tool.strokeStyle = this.strokeStyle;
    }

    setLineWidth(width) {
        this.tool.lineWidth = width;
    }
}
    
export default new ToolState();