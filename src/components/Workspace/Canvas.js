import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import GridOverlay from '../GridOverlay';
import Collage from '../Collage';

class Canvas extends Component {
    handleMouseOver = () => {
        this.props.handleCollageMouseOver();
    };

    handleMouseLeave = () => {
        this.props.handleCollageMouseLeave();
    };

    render() {
        return (
            <Root>
                <Artboard onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
                    <Collage {...this.props} />
                    <GridOverlay {...this.props} />
                </Artboard>
            </Root>
        );
    }
}

const loadInKeyframeStyles = css`
    animation: artboardLoadIn ${props => props.theme.anim.artboardLoad.dur}ms forwards;
    animation-timing-function: ${props => props.theme.anim.artboardLoad.tween};
    animation-delay: ${props => `${props.theme.anim.artboardLoad.delay}ms`};
    opacity: 0;

    @keyframes artboardLoadIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const Root = styled.div`
    &::before {
        content: '';
        padding-top: 75%; /* simple 4:3 layout */
        display: block;
    }
    display: block;
    width: 100%;
    max-width: 800px;
    position: relative;

    @media (min-width: 1400px) and (min-height: 1024px) {
        max-width: 960px;
    }
`;

const Artboard = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${props => props.theme.colors.bgArtboard};
    ${loadInKeyframeStyles};
`;

export default Canvas;
