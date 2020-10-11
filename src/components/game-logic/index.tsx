export function calculateWinner(squares: any) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    if (!squares.length) return;
    const length = squares.length;
    let occupiedCount = 0;
    for (const value in squares) {
        if (squares[value]) {
            occupiedCount += 1;
        }
    }
    if (occupiedCount === length) {
        return "draw";
    }
    return null;
}
