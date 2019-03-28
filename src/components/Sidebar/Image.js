import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import theme from '../../styles/theme';

class SidebarImage extends Component {
    state = {
        loaded: false,
        aspect: null,
        isDragging: false,
        isDropping: false,
        wasDropped: false,
        dragStartX: null,
        dragStartY: null,
        dragDeltaX: null,
        dragDeltaY: null,
    };

    wrapperRef = React.createRef();

    handleDragStart = e => {
        // pre load large image (very simple implementation ;)
        const buffer = new Image();
        buffer.src = `images/${this.props.filename}`;

        this.props.handleSidebarImageDragStart(e, this.props.index);
        const dim = this.wrapperRef.current.getBoundingClientRect();
        const dragStartX = e.clientX - dim.x;
        const dragStartY = e.clientY - dim.y;
        this.setState({
            isDragging: true,
            dragStartX,
            dragStartY,
            dragDeltaX: null,
            dragDeltaY: null,
        });
    };

    handleDragEnd = () => {
        this.setState({
            isDragging: false,
            isDropping: this.props.state.sidebar.droppingValidIndex !== null, // todo make this btter
            dragStartX: null,
            dragStartY: null,
        });
        this.props.handleSidebarImageDragEnd();
    };

    handleDrag = e => {
        e.preventDefault();
        if (!e.clientX && !e.clientY) return;
        const dim = this.wrapperRef.current.getBoundingClientRect();
        const dragDeltaX = e.clientX - dim.x - this.state.dragStartX;
        const dragDeltaY = e.clientY - dim.y - this.state.dragStartY;
        if (this.state.dragDeltaX !== dragDeltaX || this.state.dragDeltaY !== dragDeltaY) {
            this.setState({ dragDeltaX, dragDeltaY });
        }
    };

    handleImageLoad = e => {
        const width = e.target.naturalWidth;
        const height = e.target.naturalHeight;
        this.setState({ aspect: (height / width) * 100, loaded: true });
    };

    componentDidUpdate = (prevProps, prevState) => {
        const { droppingValidIndex } = this.props.state.sidebar;
        const prevDroppingValidIndex = prevProps.state.sidebar.droppingValidIndex;

        // set the dropping state
        if (!this.state.isDropping && droppingValidIndex === this.props.index) {
            this.setState({ isDropping: true });
        }

        // end the dropping state
        if (
            this.state.isDropping &&
            droppingValidIndex === null &&
            prevDroppingValidIndex === this.props.index
        ) {
            this.setState({ isDropping: false });
        }

        // set the was dropped state and remove following animation duration
        if (!this.state.isDropping && prevState.isDropping) {
            this.setState({ wasDropped: true });
            setTimeout(() => this.setState({ wasDropped: false }), theme.anim.sidebarDropped.dur);
        }
    };

    render() {
        const { sidebar } = this.props.state;
        const isDragging = sidebar.draggingIndex === this.props.index;
        const isDropping =
            sidebar.droppingInvalidIndex === this.props.index ||
            sidebar.droppingValidIndex === this.props.index;

        // don't use styled components for dynamic dragging styles
        let dragStyles = this.state.isDragging
            ? {
                  transform: `translateX(${this.state.dragDeltaX}px) translateY(${
                      this.state.dragDeltaY
                  }px)`,
                  zIndex: 1,
              }
            : {
                  transform: `translateX(0) translateY(0)`,
                  transition: `transform ${theme.anim.sidebarDropInvalid.dur}ms`,
                  transitionTimingFunction: theme.anim.sidebarDropInvalid.tween,
              };

        // freeze wrapper in place until image has animated out
        if (this.state.isDropping) {
            dragStyles = {
                transform: `translateX(${this.state.dragDeltaX}px) translateY(${
                    this.state.dragDeltaY
                }px)`,
            };
        }

        // image has animated out, snap wrapper back to original position
        if (this.state.wasDropped) {
            dragStyles = {
                transform: `translateX(0) translateY(0)`,
                transition: 'none',
            };
        }

        // reset
        const dragWrapperStyles = isDragging || isDropping ? { zIndex: 1 } : null;

        return (
            <Wrapper
                innerRef={this.wrapperRef}
                style={dragWrapperStyles}
                loaded={this.state.loaded}
            >
                <DragWrapper
                    draggable
                    onDragStart={this.handleDragStart}
                    onDrag={this.handleDrag}
                    onDragEnd={this.handleDragEnd}
                    onMouseUp={this.handleMouseUp}
                />
                <ImageWrapper style={dragStyles} loaded={this.state.loaded}>
                    <Thumbnail
                        index={this.props.index}
                        loaded={this.state.loaded}
                        isDragging={this.state.isDragging}
                        isDropping={this.state.isDropping}
                        wasDropped={this.state.wasDropped}
                        src={`images/thumbs/${this.props.filename}`}
                        alt={this.props.title}
                        onLoad={this.handleImageLoad}
                    />
                </ImageWrapper>
            </Wrapper>
        );
    }
}
const imageDraggingKeyframeStyles = css`
    animation: imageDragging ${props => `${props.theme.anim.sidebarDrag.dur}ms`} forwards;
    animation-timing-function: ${props => props.theme.anim.sidebarDrag.tween};

    @keyframes imageDragging {
        from {
            transform: scale(1);
            box-shadow: none;
        }
        to {
            transform: scale(1.3);
            box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.1);
        }
    }
`;

const imageDroppingKeyframeStyles = css`
    animation: imageDropping ${props => `${props.theme.anim.sidebarDropping.dur}ms`} forwards;

    @keyframes imageDropping {
        from {
            transform: scale(1.3);
            opacity: 1;
        }
        to {
            transform: scale(1);
            opacity: 0;
        }
    }
`;

const imageWasDroppedKeyframeStyles = css`
    animation: imageDropped ${props => `${props.theme.anim.sidebarDropped.dur}ms`} forwards;
    animation-timing-function: ${props => props.theme.anim.sidebarDropped.tween};

    @keyframes imageDropped {
        from {
            transform: translateY(-10px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;

const Wrapper = styled.div`
    position: relative;
    min-height: 40px;
    margin-bottom: 10px;
    backface-visibility: hidden;
    visibility: ${props => (props.loaded ? 'visible' : 'hidden')};
    border: ${props => props.theme.borders.sidebarImage};
    background: ${props => props.theme.colors.bgSidebarImage};
`;

const DragWrapper = styled.div`
    z-index: 9;
    position: absolute;
    top: 0;
    left: 0;
    cursor: grab;
    height: 100%;
    width: 100%;
`;

const Thumbnail = styled.img`
    max-width: 100%;
    margin: 0;
    display: block;
    opacity: ${props => (props.loaded ? 1 : 0)};
    backface-visibility: hidden;
    will-change: transform opacity;
    transition: all 300ms;
    transform: ${props => (props.loaded ? `translateY(0)` : `translateY(-10px)`)};
    transition-delay: ${props => `${100 + props.index * 20}ms}`};
    ${props => props.isDropping && imageDroppingKeyframeStyles};
    ${props => props.wasDropped && imageWasDroppedKeyframeStyles};
    ${props => props.isDragging && imageDraggingKeyframeStyles};
`;

const ImageWrapper = styled.div`
    will-change: transform;
    backface-visibility: hidden;
    pointer-events: none;
`;

export default SidebarImage;
