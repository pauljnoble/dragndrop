import React from 'react';
import styled from 'styled-components';
import Canvas from './Canvas';

export default props => (
    <Workspace onClick={props.handleCollageOutsideClick}>
        <Canvas {...props} />
    </Workspace>
);

const Workspace = styled.div`
    flex-grow: 1;
    flex-basis: 66.66%;
    display: flex;
    padding: 100px 50px 50px;
    align-items: center;
    justify-content: center;
    position: relative;
`;
