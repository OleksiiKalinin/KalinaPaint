import React from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import '../styles/toolbar.scss';
import Brush from '../tools/Brush';
import Circle from '../tools/Circle';
import Line from '../tools/Line';
import Rect from '../tools/Rect';

const ToolBar = () => {
    const changeColor = (e) => {
        toolState.setStrokeColor(e.target.value);
        toolState.setFillColor(e.target.value);
    }

    const download = () => {
        const a = document.createElement('a');
        a.href = canvasState.canvas.toDataURL();
        a.download = canvasState.sessionid + '.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    return (
        <div className='toolbar'>
            <button 
                className='toolbar__btn' 
                onClick={() => toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionid))}>
                <i className="material-icons">brush</i>
            </button>
            <button 
                className='toolbar__btn' 
                onClick={() => toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionid))}>
                <i className="material-icons">check_box_outline_blank</i>
            </button>
            <button 
                className='toolbar__btn' 
                onClick={() => toolState.setTool(new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionid))}>
                <i className="material-icons">panorama_fish_eye</i>
            </button>
            <button 
                className='toolbar__btn' 
                onClick={() => toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionid, true))}>
                <i className="material-icons">format_paint</i>
            </button>
            <button 
                className='toolbar__btn' 
                onClick={() => toolState.setTool(new Line(canvasState.canvas, canvasState.socket, canvasState.sessionid))}>
                <i className="material-icons">remove</i>
            </button>
            <i className="material-icons" style={{marginLeft: '10px'}}>color_lens</i>
            <input onChange={e => changeColor(e)} type='color' />
            <button 
                className='toolbar__btn' 
                onClick={() => canvasState.undo()}
                style={{marginLeft: 'auto'}}>
                <i className="material-icons">chevron_left</i>
            </button>
            <button 
                className='toolbar__btn' 
                onClick={() => canvasState.redo()}>
                <i className="material-icons">chevron_right</i>
            </button>
            <button 
                className='toolbar__btn' 
                onClick={download}>
                <i className="material-icons">save</i>
            </button>
        </div>
    );
};

export default ToolBar;