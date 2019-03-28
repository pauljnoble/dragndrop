import React, { Component } from 'react';
import styled from 'styled-components';

class GridItem extends Component {
    state = {
        dragOverTimeout: null,
        dragLeaveTimeout: null,
    };

    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        this.dragOverDur = this.props.state.dragIntentDur;
        this.dragLeaveDur = this.dragOverDur + 10;
    }

    handleDragStart = e => {
        e.preventDefault();
        this.props.handleGridDragStart();
    };

    handleDragEnter = e => {
        e.preventDefault();

        if (this.state.dragLeaveTimeout) {
            clearTimeout(this.state.dragLeaveTimeout);
            this.setState({ dragLeaveTimeout: null });
        }

        if (!this.state.dragOverTimeout) {
            const dragOverTimeout = setTimeout(this.handleDragEnterIntent, this.dragOverDur);
            return this.setState({ dragOverTimeout });
        }
    };

    handleDragLeave = e => {
        e.preventDefault();

        if (!this.state.dragLeaveTimeout) {
            const dragLeaveTimeout = setTimeout(this.handleDragLeaveIntent, this.dragLeaveDur);
            this.setState({ dragLeaveTimeout });
        }

        if (this.state.dragOverTimeout) {
            clearTimeout(this.state.dragOverTimeout);
            this.setState({ dragOverTimeout: null });
        }
    };

    handleDragEnterIntent = () => {
        this.props.handleGridOverlayDragEnter(this.props.index);
    };

    handleDragLeaveIntent = () => {
        const { grid } = this.props.state;
        if (grid.dragOverIndex !== null && grid.dragOverIndex === this.props.index) {
            return this.props.handleGridOverlayDragLeave();
        }
    };

    handleDragOver = e => {
        e.preventDefault();
        if (this.props.state.grid.dragOverIndex !== this.props.index) {
            this.props.handleGridOverlayDragEnter(this.props.index);
        }
    };

    handleDrop = e => {
        e.preventDefault();
        this.props.handleSidebarImageDrop();
    };

    render() {
        return (
            <Root
                innerRef={this.containerRef}
                isDraggingOver={this.props.isDraggingOver}
                count={this.props.count}
            >
                <DropZone
                    onDragEnter={this.handleDragEnter}
                    onDragOver={this.handleDragOver}
                    onDragLeave={this.handleDragLeave}
                    onDrop={this.handleDrop}
                />
            </Root>
        );
    }
}

export const Root = styled.div`
    position: relative;

    &::before,
    &::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        left: 0;
        z-index: 2;
        pointer-events: none;
        border: dashed 2px transparent;

        /* todo theme border color */
        ${props => props.count === 0 && `border-color: ${props.theme.colors.borderEmptySetDrag}`};
        ${props =>
            props.isDraggingOver &&
            props.count === 0 &&
            `border-color: ${props.theme.colors.borderEmptySetDragOver}`}};
    }
`;

const DropZone = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: ${props => props.theme.zIndexes.dropZone};
`;

export default GridItem;
