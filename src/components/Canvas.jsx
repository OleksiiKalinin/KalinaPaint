import { Button, Modal } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import '../styles/canvas.scss';
import Brush from '../tools/Brush';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Rect from '../tools/Rect';
import axios from 'axios';
import Circle from '../tools/Circle';
import Line from '../tools/Line';
import {originURL} from '../store/instances';

const Canvas = observer(() => {
    const canvasRef = useRef(null);
    const usernameRef = useRef(null);
    const canvasWrapperRef = useRef(null);
    const [modal, setModal] = useState(true);
    const [canvasSize, setCanvasSize] = useState({});
    const params = useParams();

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current);
        const ctx = canvasRef.current.getContext('2d');
        axios.get(`${originURL}/image?id=${params.id}`)
        .then(res => {
            const img = new Image();
            img.src = res.data;
            // img.src = cloudinaryGetURL + params.id + '.png';
            img.crossOrigin = "anonymous";
            img.onload = () => {
                canvasRef.current.width = img.width;
                canvasRef.current.height = img.height;
                setCanvasSize({ width: img.width + 20, height: img.height + 20 });
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
            }
        })
        .catch(err => canvasBG(ctx));
    }, []);

    const canvasBG = (ctx) => {
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
                username: canvasState.username || 'default',
                method: 'connection'
            }));
        }
        socket.onmessage = (e) => {
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
                default:
                    break;
            }
        }
    }, [canvasState.username]);

    useEffect(() => {
        canvasWrapperRef.current.onmousedown = () => {
            let flag = 0;
            new ResizeObserver(() => ++flag).observe(canvasWrapperRef.current);

            canvasWrapperRef.current.onmouseup = () => flag > 1 ? resizeCanvasReq() : false;
        }
    }, []);

    const resizeCanvasReq = () => {
        canvasState.socket.send(JSON.stringify({
            method: 'resize',
            id: canvasState.sessionid,
            size: {
                width: +canvasWrapperRef.current.style.width.replace('px', ''),
                height: +canvasWrapperRef.current.style.height.replace('px', '')
            }
        }));
    }

    const resizeCanvas = (size) => {
        canvasWrapperRef.current.style.width = size.width + 'px';
        canvasWrapperRef.current.style.height = size.height + 'px';
        canvasRef.current.width = size.width - 20;
        canvasRef.current.height = size.height - 20;
        // axios.get(`https://kalina-paint.herokuapp.com/image?id=${params.id}`)
        axios.get(`${originURL}/image?id=${params.id}`)
            .then(res => {
                const img = new Image();
                // img.src = cloudinaryGetURL + params.id + '.png';
                img.crossOrigin = "anonymous";
                img.src = res.data;
                const ctx = canvasRef.current.getContext('2d');
                img.onload = () => {
                    let x = (canvasRef.current.width - img.width) / 2;
                    let y = (canvasRef.current.height - img.height) / 2;
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                    canvasBG(ctx);
                    ctx.drawImage(img, x, y, img.width, img.height);
                    axios.post(`${originURL}/image?id=${params.id}`, { image: canvasRef.current.toDataURL() })
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

    const mouseUpHandler = async () => {
        axios.post(`${originURL}/image?id=${params.id}`, { image: canvasRef.current.toDataURL() })
        // axios.post(`http://localhost:5000/image?id=${params.id}`, {img: canvasRef.current.toDataURL()});

        // const formData = new FormData();
        // formData.append('file', canvasRef.current.toDataURL().replace('image/png', 'image/octet-stream'));
        // formData.append('upload_preset', 'kalina-why-not');
        // formData.append('cloud_name', 'kalina-why-not');
        // formData.append('public_id', `paint/${params.id}`);
        // formData.append('overwrite', true);
        // await fetch(cloudinaryPostURL, { method: 'POST', body: formData })
        // .then(res => res.json())
        // .then(data => {
        //     console.log(data);
        // })
        // .catch(e => console.dir(e))
    }

    const connectHandler = () => {
        canvasState.setUserName(usernameRef.current.value);
        setModal(false);
    }

    return (
        <div className='canvas'>
            <Modal show={modal} onHide={() => { }}>
                <Modal.Header>
                    <Modal.Title>Enter your name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" ref={usernameRef} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={connectHandler}>
                        Sign in
                    </Button>
                </Modal.Footer>
            </Modal>
            <div
                ref={canvasWrapperRef}
                className='resize'
                style={{ width: canvasSize.width, height: canvasSize.height }}
            >
                <canvas
                    ref={canvasRef}
                    onMouseDown={mouseDownHandler}
                    onMouseUp={mouseUpHandler} />
            </div>
        </div>
    );
});

export default Canvas;