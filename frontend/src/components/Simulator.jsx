import React from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { GraphicSimulator } from '../simulator/index';

import { WS_ENDPOINT } from '../baseConfig';

const Wrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    color: white;
    overflow: hidden;
`;

const Canvas = styled.canvas`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: green;
`;

export const Simulator = () => {
    const consoleRef = React.useRef();
    const canvasRef = React.useRef();
    const [output, amendOutput] = React.useState('');

    React.useEffect(() => {
        if (consoleRef && consoleRef.current) {
            let graphicSimulator;

            const socket = io(WS_ENDPOINT, {
                query: {
                    clientType: 'simulator'
                }
            });

            socket.on('connect', () => {
                console.log('connect')
                amendOutput('Simulator connected');
                graphicSimulator = new GraphicSimulator(canvasRef);
            });

            socket.on('disconnect', () => {
                amendOutput('Simulator disconnected');
            });

            socket.on('message', (data) => {
                console.log(data);
                amendOutput(`Message received: ${JSON.stringify(data)}`);
            });

            const deviceOrientationHandler = (data) => {
                const {alpha, beta, gamma} = data;
                graphicSimulator.onRotate(alpha, beta, gamma);
            }

            if (window.DeviceOrientationEvent) {
                //window.addEventListener('deviceorientation', deviceOrientationHandler, false);
            }
        }        
    }, [consoleRef, amendOutput]);

    return (
        <Wrapper ref={consoleRef}>
            <Canvas ref={canvasRef} />
        </Wrapper>
    )
};