import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";
import Game from "../../components/game";

const Home: FunctionalComponent = () => {
    return (
        <div class={style.home}>
            <Game></Game>
        </div>
    );
};

export default Home;
