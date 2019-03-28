export default {
    nineSquares: `
        grid-template-rows: 1fr 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr;
    `,
    fourByFourSquares: `
        grid-template-rows: 1fr 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr;

        > div:nth-child(1) {
            grid-row: 1 / span 2;
        }
    `,
    oneBySixSquares: `
        grid-template-rows: 1fr 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr;

        > div:nth-child(1) {
            grid-column: 1 / span 2;
        }

        > div:nth-child(7) {
            grid-column: 2 / span 2;
        }
    `,
    threeByThreeSquares: `
        grid-template-rows: 1fr 1fr 1fr;
        grid-template-columns: 1fr 1fr;
        `,
    twoByThreeSquares: `
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        > div:nth-child(1) {
            grid-column: 1 / span 2;
        }
        > div:nth-child(2) {
            grid-column: 3 / span 2;
        }
        > div:nth-child(3) {
            grid-column: 5 / span 2;
        }
        > div:nth-child(4) {
            grid-row: 2;
            grid-column: 1 / span 3;
        }
        > div:nth-child(5) {
            grid-row: 2;
            grid-column: 4 / span 3;
        }
        `,
    fourSquares: `
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr 1fr;
        `,
    threeSquares: `
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr 1fr;
            > :nth-child(3) {
                grid-column: 1 / span 2;
            }
        `,
    twoSquares: `
        grid-template-rows: 1fr;
        grid-template-columns: 1fr 1fr;
        `,
    oneSquare: `
        grid-template-rows: 1fr;
        grid-template-columns: 1fr;
        `,
};
