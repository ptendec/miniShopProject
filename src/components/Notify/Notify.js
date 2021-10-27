import React from "react";
import {useEffect} from "react";

const Notify = (props) => {
    const {name, closeNotify = Function.prototype} = props

    useEffect(() => {
        const timerId = setTimeout(closeNotify, 3000)

        return () => {
            clearTimeout(timerId)
        }
    }, [name])

    return (
        <div id={'toast-container'}>
            <div className={'toast'}>{name} added to basket</div>
        </div>
    )
}

export default Notify