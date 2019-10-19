import React from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { Button } from '@material-ui/core';

import { WS_ENDPOINT } from '../baseConfig';

const Wrapper = styled.div`
    position: relative;
    width: 400px;
    height: 400px;
    background-color: black;
    color: white;
`

export const Device = () => {
    const consoleRef = React.useRef();
    const buttonRef = React.useRef();
    const [output, amendOutput] = React.useState('');

     React.useEffect(() => {
        if (consoleRef && consoleRef.current) {
            const socket = io(WS_ENDPOINT, {
                query: {
                    clientType: 'device'
                }
            });

            socket.on('connect', () => {
                amendOutput('Device connected');
            });

            socket.on('disconnect', () => {
                amendOutput('Device disconnected');
            });
            
            buttonRef.current.addEventListener('click', () => {
                socket.emit('message', JSON.stringify({ hello: 'world'}))
            });
        }
    }, [consoleRef, amendOutput]);

    return (
        <>
        <Button ref={buttonRef}>Send message</Button>
        <Wrapper ref={consoleRef}>{output}</Wrapper>
        </>
    )
}