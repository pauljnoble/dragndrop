import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import IconDropZone from '../Icons/EmptySet';
import CollageItem from './Item';
import Draggable from './Draggable';
import getGridTemplate from '../../utils/get-grid-template';

class Collage extends Component {
    constructor(props) {
        super(props);
        this.gridNextEl = React.createRef();
        this.gridCurrentEl = React.createRef();
    }

    render() {
        const { state } = this.props;
        const { collage } = state;
        const collageItems = collage.items;
        const gridNext = [];
        const gridCurrent = [];

        for (let i = 0; i < collageItems.length + 1; i++) gridNext.push(<div key={i} />);
        for (let i = 0; i < collageItems.length; i++) gridCurrent.push(<div key={i} />);

        return (
            <Root {...this.props} count={collageItems.length} margin={state.grid.margin}>
                <GridNext
                    innerRef={this.gridNextEl}
                    count={gridNext.length}
                    margin={state.grid.margin}
                >
                    {gridNext.map(val => val)}
                </GridNext>
                <GridCurrent
                    innerRef={this.gridCurrentEl}
                    count={gridCurrent.length}
                    margin={state.grid.margin}
                >
                    {gridCurrent.map(val => val)}
                </GridCurrent>

                {collageItems.map((val, i) => (
                    <CollageItem
                        {...this.props}
                        isRendered={val.loaded} // already rendered
                        siblingCount={collageItems.length}
                        gridNextEl={this.gridNextEl}
                        grid={this.props.state.grid}
                        gridCurrentEl={this.gridCurrentEl}
                        value={val}
                        selected={collage.selectedIndex === i}
                        key={`${val.id}`}
                        index={val.index}
                    />
                ))}
                {collageItems.length === 0 && (
                    <EmptySet>
                        <IconDropZone />
                        <span>Drag an image here to begin your collage</span>
                    </EmptySet>
                )}
                <GridOverlay
                    innerRef={this.gridCurrentEl}
                    count={gridCurrent.length}
                    margin={state.grid.margin}
                >
                    {gridCurrent.map((val, i) => {
                        const collageItem = collageItems.find(val => val.index === i);
                        return (
                            <Draggable
                                {...this.props}
                                index={i}
                                key={i}
                                filename={collageItem.filename}
                                disabled={gridCurrent.length < 2}
                            />
                        );
                    })}
                </GridOverlay>
            </Root>
        );
    }
}

const EmptySet = styled.span`
    color: ${props => props.theme.colors.textFaint};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    span {
        display: block;
        font-size: 14px;
        margin-top: 1em;
    }

    svg {
        height: 100px;
        width: 100px;
        display: block;
    }
`;

const gridParentStyles = css`
    position: absolute;
    display: grid;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    grid-gap: ${props => `${props.margin}px`};
    height: 100%;
    ${props => getGridTemplate(props.count)};
    ${props => (props.count > 0 ? '> svg { display: none; }' : null)};

    > div {
        position: relative;
    }
`;

const Root = styled.div`
    position: absolute;
    top: ${props => `${props.margin}px`};
    left: ${props => `${props.margin}px`};
    right: ${props => `${props.margin}px`};
    bottom: ${props => `${props.margin}px`};
    height: ${props => `calc(100% - ${props.margin * 2}px)`};
    backface-visibility: none;
`;

const GridNext = styled.div`
    ${gridParentStyles};
`;

const GridCurrent = styled.div`
    ${gridParentStyles};

    > div::before {
        display: none;
    }
`;

const GridOverlay = styled.div`
    ${gridParentStyles};
    z-index: 2;
`;

export default Collage;
