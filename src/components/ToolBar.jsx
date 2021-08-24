import React, { useState } from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Brush from '../tools/Brush';
import Circle from '../tools/Circle';
import Line from '../tools/Line';
import Rect from '../tools/Rect';
import '../styles/toolbar.scss';

const ToolBar = () => {
    const [activeButton, setActiveButton] = useState(1);

    const changeColor = (e) => {
        toolState.setStrokeColor(e.target.value);
        toolState.setFillColor(e.target.value);
    }

    const downloadHandler = () => {
        const a = document.createElement('a');
        a.href = canvasState.canvas.toDataURL();
        a.download = canvasState.sessionid + '.jpg';
        a.click();
    }

    const openFileHandler = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = "image/jpeg,image/png,image/bmp";
        input.onchange = e => {
            const reader = new FileReader();
            reader.onloadend = () => {
                canvasState.setLocalFile(reader.result);
            }
            reader.readAsDataURL(e.target.files[0]);
        }
        input.click();
    }

    const setTool = (e, isEraser) => {
        setActiveButton(+e.target.parentNode.getAttribute('index'));

        let object = Brush;
        const name = e.target.getAttribute('name');

        if (name === 'Brush') object = Brush;
        else if (name === 'Rect') object = Rect;
        else if (name === 'Circle') object = Circle;
        else if (name === 'Line') object = Line;

        toolState.setTool(new object(canvasState.canvas, canvasState.socket, canvasState.sessionid, isEraser));
    }

    return (
        <div className='toolbar'>
            <button index='1' className={`toolbar__btn ${activeButton === 1 ? 'active' : ''}`}>
                <i className="material-icons"
                    name='Brush'
                    onClick={e => setTool(e)}>brush</i>
            </button>
            <button index='2' className={`toolbar__btn ${activeButton === 2 ? 'active' : ''}`}>
                <i className="material-icons"
                    name='Rect'
                    onClick={e => setTool(e)}>check_box_outline_blank</i>
            </button>
            <button index='3' className={`toolbar__btn ${activeButton === 3 ? 'active' : ''}`}>
                <i className="material-icons"
                    name='Circle'
                    onClick={e => setTool(e)}>panorama_fish_eye</i>
            </button>
            <button index='4' className={`toolbar__btn ${activeButton === 4 ? 'active' : ''}`}>
                <i className="material-icons"
                    name='Brush'
                    onClick={e => setTool(e, true)}>format_paint</i>
            </button>
            <button index='5' className={`toolbar__btn ${activeButton === 5 ? 'active' : ''}`}>
                <i className="material-icons"
                    name='Line'
                    onClick={e => setTool(e)}>remove</i>
            </button>
            <i className="material-icons" style={{ marginLeft: '10px' }}>color_lens</i>
            <input onChange={e => changeColor(e)} type='color' />
            <button
                className='toolbar__btn'
                onClick={openFileHandler}
                style={{ marginLeft: 'auto' }}>
                <i className="material-icons">folder_open</i>
            </button>
            {/* <button
                className='toolbar__btn'
                onClick={() => canvasState.undo()}>
                <i className="material-icons">chevron_left</i>
            </button>
            <button
                className='toolbar__btn'
                onClick={() => canvasState.redo()}>
                <i className="material-icons">chevron_right</i>
            </button> */}
            <button
                className='toolbar__btn'
                onClick={downloadHandler}>
                <i className="material-icons">save</i>
            </button>
        </div>
    );
};

export default ToolBar;