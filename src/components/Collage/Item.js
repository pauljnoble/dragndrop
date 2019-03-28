import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { TweenMax } from 'gsap';
import theme from '../../styles/theme';

class CollageItem extends Component {
    state = {
        loaded: false,
        firstRender: true,
        isDraggingOver: false,
        containerAspect: null,
        imageAspect: null,
        styles: null,
    };

    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        this.imageRef = React.createRef();
        this.wrapperRef = React.createRef();
    }

    handleImageLoad = () => {
        this.updateAspect();
        this.props.handleCollageImageLoad(this.props.index);
        this.setState({ loaded: true });
    };

    handleDocumentResize = () => {
        const styles = this.morphToGridCellStyles(
            this.props.gridCurrentEl.current,
            this.props.index,
            false,
        );
        this.setState({ styles });
    };

    updateAspect = () => {
        const width = this.imageRef.current.naturalWidth;
        const height = this.imageRef.current.naturalHeight;
        const imageAspect = height / width;
        const containerDimensions = this.containerRef.current.getBoundingClientRect();
        const containerAspect = containerDimensions.height / containerDimensions.width;
        this.setState({ containerAspect, imageAspect });
    };

    morphToGridCellStyles = (gridEl, toIndex, transition = true) => {
        if (!gridEl) return;

        const gridDimensions = gridEl.getBoundingClientRect();
        const toEl = gridEl.childNodes[toIndex];
        const fromDimensions = this.wrapperRef.current.getBoundingClientRect();
        const toDimensions = toEl.getBoundingClientRect();
        const x = toDimensions.left - gridDimensions.left;
        const y = toDimensions.top - gridDimensions.top;

        const styles = {
            left: x,
            top: y,
            width: toDimensions.width,
            height: toDimensions.height,
        };

        if (transition) {
            TweenMax.fromTo(
                this.wrapperRef.current,
                theme.anim.gridMorph.dur / 1000,
                {
                    left: this.wrapperRef.current.style.left,
                    top: this.wrapperRef.current.style.top,
                    width: fromDimensions.width,
                    height: fromDimensions.height,
                },
                {
                    left: x,
                    top: y,
                    width: toDimensions.width,
                    height: toDimensions.height,
                },
            );
            return null;
        }

        return styles;
    };

    componentDidUpdate(prevProps) {
        const { sidebar, grid, collage } = this.props.state;
        const { index, gridNextEl, gridCurrentEl } = this.props;

        // initial render / image load - snap to current grid
        if (prevProps.state.sidebar.droppingValidIndex !== sidebar.droppingValidIndex) {
            const styles = this.morphToGridCellStyles(gridCurrentEl.current, index, false);
            this.setState({ styles });
        }

        // sibling count changed
        if (prevProps.siblingCount !== this.props.siblingCount) {
            const styles = this.morphToGridCellStyles(gridCurrentEl.current, index);
            this.setState({ styles });
        }

        // dragged over by sidebar item - animate to next grid
        if (
            this.state.loaded &&
            (grid.dragOverIndex || grid.dragOverIndex === 0) &&
            grid.dragOverIndex !== prevProps.state.grid.dragOverIndex
        ) {
            const toIndex = grid.dragOverIndex > index ? index : index + 1;
            const styles = this.morphToGridCellStyles(gridNextEl.current, toIndex);
            this.setState({ styles });
        }

        // dragged over by collage item - animate to current grid with gap in dragged over idnex
        if (
            this.state.loaded &&
            (collage.dragOverIndex || collage.dragOverIndex === 0) &&
            collage.dragOverIndex !== prevProps.state.collage.dragOverIndex
        ) {
            let toIndex = index === collage.dragOverIndex ? collage.draggingIndex : index;

            if (index === collage.draggingIndex && toIndex !== collage.dragOverIndex) {
                toIndex = collage.dragOverIndex;
            }
            const styles = this.morphToGridCellStyles(gridCurrentEl.current, toIndex);
            this.setState({ styles });
        }

        // dragged out - animate to current grid
        if (
            this.state.loaded &&
            grid.dragOverIndex === null &&
            prevProps.state.grid.dragOverIndex !== null
        ) {
            const styles = this.morphToGridCellStyles(gridCurrentEl.current, this.props.index);
            this.setState({ styles });
        }
    }

    siblingsLoaded = () => {
        const siblings = this.props.state.collage.items;
        if (!siblings) return;
        return siblings.filter(val => val.loaded).length === siblings.length;
    };

    componentDidMount = () => {
        window.addEventListener('resize', this.handleDocumentResize);

        const firstRender = !this.props.isRendered;

        const styles = this.morphToGridCellStyles(
            this.props.gridCurrentEl.current,
            this.props.index,
            false,
        );
        this.setState({ styles, firstRender });
    };

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.handleDocumentResize);
    };

    render() {
        const { value } = this.props;
        const isDragging = this.props.state.collage.draggingIndex === this.props.index;

        return (
            <Root
                style={this.state.styles}
                loaded={this.state.loaded}
                firstRender={this.state.firstRender}
                innerRef={this.wrapperRef}
            >
                {value && (
                    <DropContent>
                        <ImageWrapper
                            innerRef={this.containerRef}
                            index={this.props.index}
                            firstRender={this.state.firstRender}
                            loaded={this.state.loaded}
                        >
                            <Image
                                innerRef={this.imageRef}
                                src={`/images/${value.filename}`}
                                onLoad={this.handleImageLoad}
                                isDragging={isDragging}
                                wideAspect={this.state.containerAspect > this.state.imageAspect}
                                alt={value.title}
                            />
                        </ImageWrapper>
                    </DropContent>
                )}
            </Root>
        );
    }
}

const firstRenderKeyframeStyles = css`
    animation: firstRenderAnimation 300ms forwards;
    animation-timing-function: ${props => props.theme.anim.collageFirstRender.tween};

    @keyframes firstRenderAnimation {
        from {
            visibility: hidden;
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            visibility: visible;
            opacity: 1;
            transform: scale(1);
        }
    }
`;

const Root = styled.div`
    position: absolute;
    overflow: hidden;
    height: 100%;
    width: 100%;
    backface-visibility: none;
`;

const ImageWrapper = styled.div`
    position: absolute;
    overflow: hidden;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    visibility: ${props => (props.loaded ? 'visible' : 'hidden')};
    z-index: ${props => (props.isDragging ? '1' : '2')};
    ${props => props.firstRender && props.loaded && firstRenderKeyframeStyles};
`;

const Image = styled.img`
    object-fit: cover;
    width: 100%;
    height: 100%;
    ${props => props.isDragging && `opacity: ${props.theme.opacities.collageDragOverCollage}`};
    transition: opacity ${props => `${props.theme.anim.collageImageDrag.dur}ms`};
    transition-timing-function: ${props => props.theme.anim.collageImageDrag.tween};
`;

const DropContent = styled.div`
    height: 100%;
`;

export default CollageItem;
