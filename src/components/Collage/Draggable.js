import React, { Component } from 'react';
import styled, { css } from 'styled-components';

class Draggable extends Component {
    state = {
        isDragging: false,
        dragStartX: null,
        dragStartY: null,
        dragDeltaX: null,
        dragDeltaY: null,
    };

    wrapperRef = React.createRef();

    handleDrag = e => {
        e.preventDefault();
        if (!e.clientX && !e.clientY) return;
        const dim = this.wrapperRef.current.getBoundingClientRect();
        const dragDeltaX = e.clientX - dim.x;
        const dragDeltaY = e.clientY - dim.y;
        this.setState({ dragDeltaX, dragDeltaY });
    };

    handleDragStart = e => {
        this.props.handleCollageImageDragStart(this.props.index);
        const dim = this.wrapperRef.current.getBoundingClientRect();
        const dragStartX = e.clientX - dim.x;
        const dragStartY = e.clientY - dim.y;
        this.setState({ isDragging: true, dragStartX, dragStartY });
    };

    handleDragEnd = () => {
        this.setState({ isDragging: false });
        this.props.handleCollageImageDragEnd();
    };

    handleDragEnter = () => {
        this.props.handleCollageImageDragEnter(this.props.index);
    };

    handleDragOver = e => {
        e.preventDefault();
    };

    handleDrop = () => {
        this.props.handleCollageImageDrop(this.props.index);
    };

    handleClick = e => {
        e.preventDefault();
        this.props.handleCollageImageRemove(this.props.index);
    };

    render() {
        const dragStyles = this.state.isDragging
            ? {
                  transform: `translateX(${this.state.dragDeltaX}px) translateY(${
                      this.state.dragDeltaY
                  }px)`,
                  zIndex: 1,
              }
            : null;

        return (
            <Root innerRef={this.wrapperRef}>
                <DragImage style={dragStyles} isDragging={this.state.isDragging}>
                    <img src={`images/thumbs/${this.props.filename}`} />
                </DragImage>
                <DragHandle
                    draggable
                    onDragStart={this.handleDragStart}
                    onDragEnter={this.handleDragEnter}
                    onDragEnd={this.handleDragEnd}
                    onDragOver={this.handleDragOver}
                    onDrop={this.handleDrop}
                    onDrag={this.handleDrag}
                    disabled={this.props.disabled}
                />
                <ButtonRemove onClick={this.handleClick} isDragging={this.state.isDragging} />
            </Root>
        );
    }
}

const ButtonRemove = styled.button`
    background: transparent;
    border: 0;
    position: absolute;
    border-radius: 50%;
    width: 26px;
    height: 26px;
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    user-select: none;
    top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 10px;
    z-index: 2;
    outline: none;
    visibility: hidden;
    cursor: pointer;
    opacity: 0;
    transition: all 200ms; /* todo theme */

    ${props => props.isDragging && 'opacity: 0 !important; pointer-events: none'};

    &::before {
        content: '✕';
        font-size: 14px;
        line-height: 24px;
    }

    &:hover {
        background-color: rgba(0, 0, 0, 0.4);
    }
`;

const Root = styled.div`
    position: relative;

    &:hover ${ButtonRemove} {
        visibility: visible;
        opacity: 1;
    }
`;

const DragHandle = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    ${props => props.disabled && 'pointer-events: none'};
`;

// todo move this to theme
const animateInStyles = css`
    animation: fadeIn 300ms forwards;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const DragImage = styled.div`
    position: absolute;
    width: 100px;
    height: 100px;
    pointer-events: none;
    visibility: ${props => (props.isDragging ? 'visible' : 'hidden')};

    img {
        width: 100%;
        opacity: 0;
        ${props => props.isDragging && animateInStyles};
    }
`;

export default Draggable;
