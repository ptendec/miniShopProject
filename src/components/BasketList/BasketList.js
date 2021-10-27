import React from "react";
import BasketItem from "../BasketItem/BasketItem";

const BasketList = props => {
    const {order = [],
        handleBasketShow = Function.prototype,
        removeFromBasket = Function.prototype,
        decQuantity = Function.prototype,
        incQuantity = Function.prototype,
    } = props
    const totalSum = order.reduce(
        (sum, element) => {
            return sum + element.price * element.quantity
        },
        0
    )
    return (
        <div className="collection basket-list">
            <h4 className="collection-item active">Basket</h4>
            {
                order.length ?
                    order.map(
                        (item) => {
                            return <BasketItem key={item.id} {...item} removeFromBasket={removeFromBasket} decQuantity={decQuantity} incQuantity={incQuantity}/>
                        }
                    )
                    :
                    (<h4 className={'collection-item'}>Basket is empty</h4>)

            }
            <h5 className={'collection-item active'}>Total sum: {totalSum}
                <button className={'secondary-content btn'}>Buy</button>

            </h5>
            <i className={'material-icons basket-close'} onClick={handleBasketShow}>close</i>
        </div>
    )
}

export default BasketList