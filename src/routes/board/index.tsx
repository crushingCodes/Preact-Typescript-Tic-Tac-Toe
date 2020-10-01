import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";

const Board: FunctionalComponent = () => {
    return (
        <div class={style.home}>
            <h1>Board</h1>
            <p>This is the Board component.</p>
        </div>
    );
};

export default Board;
