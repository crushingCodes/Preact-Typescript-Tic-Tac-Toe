import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router/match";
import * as style from "./style.css";

const Header: FunctionalComponent = () => {
    return (
        <header class={style.header}>
            <h1>Preact App - React Tutorial</h1>
            <nav>
                <Link activeClassName={style.active} href="/">
                    Game
                </Link>
            </nav>
        </header>
    );
};

export default Header;
