import React from "react";

function GoodsItem(props){
    const {
        id,
        name,
        description,
        price,
        full_background,
        addToBasket = Function.prototype
    } = props

    return (
        <div className="card" id={id}>
            <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src={full_background} alt={name} />
            </div>
            <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">{name}</span>
                <p>
                    {description}
                </p>
                <div className="card-action">
                    <button className={'btn'} onClick={() => {addToBasket({id, name, price})}}>Buy</button>
                    <span className={'right'}>{price}</span>
                </div>
            </div>
        </div>
    )
}

export default GoodsItem