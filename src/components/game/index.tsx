import { Component, FunctionalComponent, h } from "preact";
import * as style from "./style.css";

interface SquareComponentState {
    value: any;
    onClick: any;
}

type BoardComponentState = {
    status: string;
    squares: any;
    xIsNext: boolean;
};

const Square: FunctionalComponent<SquareComponentState> = ({
    value,
    onClick
}: SquareComponentState) => {
    return (
        <button className={style.square} onClick={() => onClick()}>
            {value}
        </button>
    );
};

function calculateWinner(squares: any) {
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
    return null;
}

class Game extends Component<any, BoardComponentState> {
    constructor() {
        super();
        this.state = {
            status: "",
            squares: Array(9).fill(null),
            xIsNext: true
        };
    }
    handleClick(i: any) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";

        this.setState({
            squares,
            xIsNext: !this.state.xIsNext
        });
    }
    renderSquare(i: number) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }
        return (
            <div>
                <div className={style.status}>{status}</div>
                <div className={style["board-row"]}>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className={style["board-row"]}>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className={style["board-row"]}>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export default Game;
