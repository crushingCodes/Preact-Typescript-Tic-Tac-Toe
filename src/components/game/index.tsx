import { Component, FunctionalComponent, h } from "preact";
import * as style from "./style.css";
import Board from "../board";
import { calculateWinner } from "../game-logic";

type GameComponentState = {
    history: any[];
    xIsNext: boolean;
    stepNumber: number;
};

class Game extends Component<any, GameComponentState> {
    constructor(props: any) {
        super(props);
        this.newGame();
    }

    handleClick(i: any) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
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
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });
    }

    jumpTo(stepNumber: number) {
        this.setState({
            stepNumber,
            xIsNext: stepNumber % 2 === 0 ? true : false
        });
    }

    newGame() {
        this.setState({
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            xIsNext: true,
            stepNumber: 0
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const gameStatus = calculateWinner(current.squares);
        const moves = history.map((step: number, move: any) => {
            if (move === 0) return;
            const desc = move ? "Goto move # " + move : "";
            return (
                <li key={step}>
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
                    <ol>
                        <button onClick={() => this.newGame()}>New Game</button>
                        {moves}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Game;
