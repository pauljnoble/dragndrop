import gridTemplates from '../styles/grid-templates';

export default cells => {
    switch (cells) {
        // todo: the key should map to a string to
        // allow multiple grids for each cell count
        case 9:
            return gridTemplates.nineSquares;
        case 8:
            return gridTemplates.fourByFourSquares;
        case 7:
            return gridTemplates.oneBySixSquares;
        case 6:
            return gridTemplates.threeByThreeSquares;
        case 5:
            return gridTemplates.twoByThreeSquares;
        case 4:
            return gridTemplates.fourSquares;
        case 3:
            return gridTemplates.threeSquares;
        case 2:
            return gridTemplates.twoSquares;
        default:
            return gridTemplates.oneSquare;
    }
};
