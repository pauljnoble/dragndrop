import React from 'react';
import styled from 'styled-components';
import GridItem from './Item';
import getGridTemplate from '../../utils/get-grid-template';

const GridOverlay = props => {
    const { state } = props;
    const { collage, images, sidebar, grid } = state;
    const gridItemCount = sidebar.draggingIndex ? collage.items.length + 1 : collage.items.length; // show the next grid
    const gridItems = [...Array(gridItemCount).keys()];
    const disabled = state.collage.items.length === state.collage.limit;
    const isMouseOver = state.collage.isHovering && !state.sidebar.draggingIndex;

    return (
        <Wrapper {...props} count={gridItemCount} disabled={disabled} isMouseOver={isMouseOver}>
            {gridItems.map((val, i) => (
                <GridItem
                    {...props}
                    isDragging={images.draggingIndex !== null}
                    isCollageItemSelected={collage.selectedIndex !== null}
                    count={collage.items.length}
                    isDraggingOver={grid.dragOverIndex === i}
                    index={i}
                    disabled={disabled}
                    key={i}
                />
            ))}
        </Wrapper>
    );
};

// todo - make grid gap configurable
const Wrapper = styled.div`
    position: absolute;
    display: grid;
    grid-gap: 0; /* set a gap of zero to avoid drag hover dead zones */
    top: ${props => `${props.state.grid.margin}px`};
    left: ${props => `${props.state.grid.margin}px`};
    right: ${props => `${props.state.grid.margin}px`};
    bottom: ${props => `${props.state.grid.margin}px`};
    width: ${props => `calc(100% - ${props.state.grid.margin * 2}px)`};
    height: ${props => `calc(100% - ${props.state.grid.margin * 2}px)`};
    ${props => getGridTemplate(props.count)};
    ${props => props.isMouseOver && 'pointer-events: none'};
`;

export default GridOverlay;
