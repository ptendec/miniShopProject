import {useState, useEffect} from "react";
import {API_KEY, API_URL} from "../../config";
import {Preloader} from "../Preloader/Preloader";
import {GoodsList} from "../GoodsList/GoodsList";
import {Cart} from "../Cart/Cart";
import BasketList from "../BasketList/BasketList";
import Notify from "../Notify/Notify";

const Shop = () => {
    const [goods, setGoods] = useState([])
    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState([])
    const [isBasketShow, setBasketShow] = useState(false)
    const [notifyMessage, setNotifyMessage] = useState('')

    const addToBasket = item => {
        const itemIndex = order.findIndex(orderItem => orderItem.id === item.id)

        if (itemIndex < 0){
            const newItem = {
                ...item,
                quantity: 1
            }
            setOrder([...order, newItem])
        }
        else {
            const newOrder = order.map((orderItem, index) => {
                if (index === itemIndex){
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1
                    }
                }
                else {
                    return orderItem
                }
            })
            setOrder(newOrder)
        }
        console.log(order)
        setNotifyMessage(item.name)
    }

    const handleBasketShow = () => {
        setBasketShow(!isBasketShow)
    }

    const closeNotify = () => {
        setNotifyMessage('')
    }
    const removeFromBasket = (itemId) => {
        const newOrder = order.filter(element => element.id !== itemId)
        setOrder(newOrder)
    }

    const incQuantity = (itemId) => {
        const newOrder = order.map(element => {
            if (element.id === itemId){
                const newQuantity = element.quantity + 1
                return {
                    ...element,
                    quantity: newQuantity
                }
            }
            else {
                return element
            }

        })
        setOrder(newOrder)

    }
    const decQuantity = (itemId) => {
        const newOrder = order.map(element => {
            if (element.id === itemId){
                const newQuantity = element.quantity - 1
                return {
                    ...element,
                    quantity: newQuantity >= 0 ? newQuantity : 0
                }
            }
            else {
                return element
            }

        })
        setOrder(newOrder)
    }
        useEffect(function getGoods(){
        fetch(API_URL, {
            headers:{
                'Authorization': API_KEY
            }

        }).then(response => response.json()).then(data => {
            data.featured && setGoods(data.featured)
            setLoading(false)
        })
    }, [])
    return (
        <main className={'container content'}>
            <Cart quantity={order.length} handleBasketShow={handleBasketShow}/>
            {loading ? <Preloader /> : <GoodsList goods={goods} addToBasket={addToBasket}/>}
            {
                isBasketShow && <BasketList handleBasketShow={handleBasketShow} order={order} removeFromBasket={removeFromBasket} decQuantity={decQuantity} incQuantity={incQuantity}/>
            }
            {notifyMessage && <Notify name={notifyMessage} closeNotify={closeNotify} />}
        </main>
    )
}

export default Shop

