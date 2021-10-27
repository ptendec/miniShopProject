import React from "react";

const BasketItem = props => {
    const {
        id,
        name,
        price,
        quantity = 1,
        removeFromBasket = Function.prototype,
        decQuantity = Function.prototype,
        incQuantity = Function.prototype
    } = props
    return (
        <a className="collection-item">
            {name} x{quantity} = {price * quantity}
            <button onClick={() => incQuantity(id)} className={'material-icons changeQuantityBtn'}>add</button>
            <button onClick={() => decQuantity(id)} className={'material-icons changeQuantityBtn'}>remove</button>
            <span className="secondary-content"><i className="material-icons basket-delete" onClick={() => removeFromBasket(id)}>close</i></span>
        </a>
    )
}

export default BasketItem