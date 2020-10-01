import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";
import Board from "../../components/board";

const Home: FunctionalComponent = () => {
    return (
        <div class={style.home}>
            <Board></Board>
        </div>
    );
};

export default Home;
