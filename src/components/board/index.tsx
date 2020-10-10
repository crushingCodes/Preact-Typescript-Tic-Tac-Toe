import { Component, ComponentChild, FunctionalComponent, h } from "preact";
import * as style from "./style.css";

interface SquareComponentState {
    value: any;
    onClick: any;
}
// type AppProps = {
//     value: any;
// };

type BoardComponentState = {
    squares: any;
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

class Board extends Component<any, BoardComponentState> {
    constructor() {
        super();
        this.state = { squares: Array(9).fill(null) };
    }
    handleClick(i: any) {
        console.log(i);
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
        const status = "Next player: X";

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

export default Board;
