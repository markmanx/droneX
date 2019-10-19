import React from 'react';
import styled from 'styled-components';

import { Simulator } from './components/Simulator';
import { Device } from './components/Device';

const Wrapper = styled.div`
  display: flex;
`

function App() {
  return (
    <Wrapper>
      <Simulator />
      <Device />
    </Wrapper>
  );
}

export default App;
