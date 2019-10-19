import React from 'react';
import styled from 'styled-components';

import { Simulator } from './components/Simulator';
// import { Device } from './components/Device';

const Wrapper = styled.div`
  display: flex;
`;

const DeviceWrapper = styled.div`
  width : 200px;
  height: 100px;
`;

function App() {
  return (
    <Wrapper>
      <Simulator />
    </Wrapper>
  );
}

export default App;
