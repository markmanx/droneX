import React from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { GraphicSimulator } from '../simulator/index';

import { WS_ENDPOINT } from '../baseConfig';

const Wrapper = styled.div`
    position: relative;
    width: 400px;
    height: 400px;
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
                amendOutput('Simulator connected');
                graphicSimulator = new GraphicSimulator(canvasRef);
            });

            socket.on('disconnect', () => {
                amendOutput('Simulator disconnected');
            });

            socket.on('message', (_data) => {
                const data = JSON.parse(_data);
                amendOutput(`Message received: ${JSON.stringify(data)}`);
            });
        }

        

    }, [consoleRef, amendOutput]);

    return (
        <Wrapper ref={consoleRef}>
            <Canvas ref={canvasRef} />
        </Wrapper>
    )
};