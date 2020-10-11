import { Component, FunctionalComponent, h } from "preact";
import * as style from "./style.css";

type SquareComponentProps = {
    value: any;
    onClick: any;
};

const Square: FunctionalComponent<SquareComponentProps> = ({
    value,
    onClick
}: SquareComponentProps) => {
    return (
        <button className={style.square} onClick={() => onClick()}>
            {value}
        </button>
    );
};

export default Square;
