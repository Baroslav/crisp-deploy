import './cart.css'
import { goodsList } from '../catalog-list/catalog-list'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const Cart =()=> {
    const dispach=useDispatch()
    const cartItem =useSelector((state:any)=>state.cartReducer.cartItem)
    const favorite=useSelector((state:any)=>state.favoriteReducer.favorite)

    const deletCart =(item:Object)=>{
        dispach({type:"REMOVE_FROM_CART",payLoad:item})
    }
    const addFavorite=(item:Object)=>{
        if(!favorite.includes(item)){
            dispach({type:"ADD_FAVORITE",payLoad:item})
        }
    }

    const total = cartItem.reduce((accamulator:number, curentValue:any)=> {
        return accamulator +curentValue.price
    },0)

    const [showMobileItem, setShowMobileItem] = useState(false)
    
    useEffect(()=>{
        if(window.screen.width < 1025) {
            setShowMobileItem(true)
        }
    },[])

    return (
        <section className="cart">
            <h4 className='cart-header-main'>Shoping cart</h4>
            <div className="cart-grop">
                   {!showMobileItem &&  <div className="cart-contein">
                        <div className="cart-headers">
                            <h3>Product</h3>
                            <h3>Price</h3>
                            <h3>Size</h3>
                            <h3>Quantity</h3>
                            <h3>Total</h3>
                        </div>
                        <div className="cart-items">
                           {
                           cartItem.map((item:any)=>(
                                <div className="cart-item">
                                <div className="main-info">
                                    <img className='goods-img' src={item.img} alt="" />
                                    <div className="titleAndColor">
                                        <h3>{item.title}</h3>

                                    </div>
                                </div>
                                <p className="price-cart">{item.price} EUR</p>
                                <p className='size-cart'></p>
                                <span className="quntitu">
                                    1
                                </span>
                                <p className="totl">{item.price}</p>
                                <div className="cart-buttons">
                                    <span
                                    onClick={()=>addFavorite(item)}
                                     className='likes-btn'>
                                        <img src="../../img/cartGrop/like.svg" alt="" />
                                    </span>
                                    <span 
                                    className='delet-btn'
                                    onClick={()=>deletCart(item)}
                                    ></span>
                                </div>
                            </div>
                           ))
                           }
                        </div>
                    
                    </div>
                    }
                        
                    {
                        showMobileItem && 
                        <div className="cart-grop">
                            <div className="cart-items">
                                {
                                cartItem.map((item:any,id:number)=>(
                                    <div className="cart-item">
                                        <div className="imgAndInfo">
                                            <img src={item.img} alt="" />
                                            <div className="item-info">
                                                <h3 className='item-title'>{item.title}</h3>
                                                <p><span>Size:</span> {item.size[0]}</p>
                                                <div className='color-info'>
                                                    <span>Color:</span>
                                                    <div className="color-block active">
                                                        <div 
                                                        className="iner-block" 
                                                        style={{backgroundColor: item.color}}>
                                                        </div>
                                                     </div>
                                                </div>
                                            </div>
                                        </div>
                                            <div className="quantityAndPrice">
                                                <div className='quantity-counter'>
                                                    <span>-</span>
                                                        <p>{item.quantity}</p>
                                                    <span>+</span>
                                                </div>
                                                <h3><span>Price</span> {item.price} EUR</h3>
                                            </div>
        
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    }
              
                        
                    
                    <aside className="cart-info">
                        <div className="order">
                            <div className="total-order-price">
                                <p className="subtotal">
                                    <span>Subtotal</span>
                                    <span>{total}</span>
                                </p>
                                <p className="tax">
                                    <span>Tax</span>
                                    <span>0.00 EUR</span>
                                </p>
                                <p className="order-total">
                                    <span>Order Total</span>
                                    <span>{total}</span>
                                </p>
                            </div>
                            <button>proceed to checkout</button>
                        </div>
                    </aside>
            </div>
        </section>
    )
}


export {Cart}