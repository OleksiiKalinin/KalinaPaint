import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Brush from '../tools/Brush';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Rect from '../tools/Rect';
import axios from 'axios';
import Circle from '../tools/Circle';
import Line from '../tools/Line';
import { originURL } from '../store/instances';
import '../styles/canvas.scss';

const Canvas = observer(() => {
    const canvasRef = useRef(null);
    const canvasWrapperRef = useRef(null);
    const canvasFieldRef = useRef(null);
    const [canvasSize, setCanvasSize] = useState({ width: 520, height: 420 });
    const params = useParams();

    const setImage = (image) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = image;
        img.crossOrigin = "anonymous";
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            setCanvasSize({ width: img.width + 20, height: img.height + 20 });
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            postImageHandler();
        }
    }

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current);
        axios.get(`${originURL}/image?id=${params.id}`)
            .then(res => setImage(res.data))
            .catch(_ => canvasBG());

        canvasWrapperRef.current.onmousedown = () => {
            let flag = 0;
            let isMouseDown = true;
            new ResizeObserver(() => ++flag).observe(canvasWrapperRef.current);

            //////////////переделать
            window.onmouseup = () => {
                isMouseDown = false;
                if (flag > 1) {
                    const { width, height } = canvasWrapperRef.current.style;
                    canvasState.socket.send(JSON.stringify({
                        method: 'resize',
                        id: canvasState.sessionid,
                        size: { width, height }
                    }));
                }
            }

            if (!isMouseDown) window.onmouseup = null;
        }
    }, []);

    const canvasBG = () => {
        const ctx = canvasRef.current.getContext('2d');
        let tempColor = ctx.fillStyle;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.fillStyle = tempColor;
    }

    useEffect(() => {
        const socket = new WebSocket(originURL.replace(/^http/, 'ws'));
        canvasState.setSocket(socket);
        canvasState.setSessionId(params.id);
        toolState.setTool(new Brush(canvasRef.current, socket, params.id));
        socket.onopen = () => {
            console.log('connected');
            socket.send(JSON.stringify({
                id: params.id,
                username: 'anonymous',
                method: 'connection'
            }));
        }
        socket.onmessage = e => {
            let msg = JSON.parse(e.data)
            switch (msg.method) {
                case 'connection':
                    console.log(msg.username + ' connected');
                    break;
                case 'draw':
                    drawHandler(msg);
                    break;
                case 'resize':
                    resizeCanvas(msg.size);
                    break;
                case 'local_file':
                    setImage(msg.file);
                    break;
                default: break;
            }
        }
    }, [canvasState.username]);

    useEffect(() => {
        if (canvasState.localFile) {
            canvasState.socket.send(JSON.stringify({
                method: 'local_file',
                id: canvasState.sessionid,
                file: canvasState.localFile
            }));
        }
    }, [canvasState.localFile]);

    const resizeCanvas = (size) => {
        const canvas = canvasRef.current;
        canvasWrapperRef.current.style.width = size.width;
        canvasWrapperRef.current.style.height = size.height;
        canvas.width = +size.width.replace('px', '') - 20;
        canvas.height = +size.height.replace('px', '') - 20;
        axios.get(`${originURL}/image?id=${params.id}`)
            .then(res => {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.src = res.data;
                const ctx = canvas.getContext('2d');
                img.onload = () => {
                    let x = Math.round((canvas.width - img.width) / 2);
                    let y = Math.round((canvas.height - img.height) / 2);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    canvasBG();
                    ctx.drawImage(img, x, y, img.width, img.height);
                    postImageHandler();
                }
            })
    }

    const drawHandler = (msg) => {
        const { type, x, y, x2, y2, width, height, radius, color, lineWidth, strokeStyle, isEraser } = msg.figure;
        const ctx = canvasRef.current.getContext('2d');
        switch (type) {
            case 'brush':
                Brush.draw(ctx, x, y, color, lineWidth, strokeStyle, isEraser);
                break;
            case 'line':
                Line.draw(ctx, x, y, x2, y2, color, lineWidth, strokeStyle);
                break;
            case 'rect':
                Rect.draw(ctx, x, y, width, height, color, lineWidth, strokeStyle);
                break;
            case 'circle':
                Circle.draw(ctx, x, y, radius, color, lineWidth, strokeStyle);
                break;
            case 'finish':
                ctx.beginPath();
                break;
            default:
                break;
        }
    }

    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL());
    }

    const mouseUpHandler = () => postImageHandler();

    const postImageHandler = () => {
        axios.post(`${originURL}/image?id=${params.id}`, { image: canvasRef.current.toDataURL() });
    }

    // const connectHandler = () => {
    //     canvasState.setUserName(usernameRef.current.value);
    //     setModal(false);
    // }

    return (
        <div className='canvas' ref={canvasFieldRef}>
            <div
                ref={canvasWrapperRef}
                className='resize'
                style={{ width: canvasSize.width, height: canvasSize.height }}
            >
                <canvas
                    ref={canvasRef}
                    onMouseDown={mouseDownHandler}
                    onMouseUp={mouseUpHandler}
                    width={canvasSize.width - 20}
                    height={canvasSize.height - 20} />
            </div>
        </div>
    );
});

export default Canvas;