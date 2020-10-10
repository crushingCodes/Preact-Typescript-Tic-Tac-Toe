import { Component, FunctionalComponent, h } from "preact";
import * as style from "./style.css";

interface SquareComponentState {
    value: any;
    onClick: any;
}

type BoardComponentState = {
    history: any;
    xIsNext: boolean;
    stepNumber: number;
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

class Board extends Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    renderSquare(i: number) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }
    render() {
        return (
            <div>
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

class Game extends Component<any, BoardComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            xIsNext: true,
            stepNumber: 0
        };
    }
    handleClick(i: any) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";

        this.setState({
            history: history.concat([
                {
                    squares
                }
            ]),
            xIsNext: !this.state.xIsNext
        });
    }
    jumpTo(stepNumber: number) {
        // const history = this.state.history;
        // const target = history[move];
        this.setState({
            stepNumber,
            xIsNext: stepNumber % 2 === 0 ? true : false
        });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const gameStatus = calculateWinner(current.squares);

        const moves = history.map((step: number, move: any) => {
            const desc = move ? "Goto move # " + move : "Goto game start";
            return (
                <li>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (gameStatus && gameStatus === "draw") {
            status = "Draw!";
        } else if (gameStatus) {
            status = "Winner: " + gameStatus;
        } else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }
        return (
            <div className={style.game}>
                <div className={style["game-board"]}>
                    <Board
                        squares={current.squares}
                        onClick={(i: any) => this.handleClick(i)}
                    ></Board>
                </div>
                <div className={style["game-info"]}>
                    <div className={style.status}>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;
