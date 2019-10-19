import React from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';

import { WS_ENDPOINT } from '../baseConfig';

const Wrapper = styled.div`
    position: relative;
    width: 400px;
    height: 400px;
    background-color: black;
    color: white;
`

export const Simulator = () => {
    const consoleRef = React.useRef();
    const [output, amendOutput] = React.useState('');

    React.useEffect(() => {
        if (consoleRef && consoleRef.current) {
            const socket = io(WS_ENDPOINT, {
                query: {
                    clientType: 'simulator'
                }
            });

            socket.on('connect', () => {
                amendOutput('Simulator connected');
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
        <Wrapper ref={consoleRef}>{output}</Wrapper>
    )
};