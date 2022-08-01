import React, { useState, useEffect } from 'react'

function CheckoutRight() {
    let localCart = localStorage.getItem("Eli");
    localCart = JSON.parse(localCart)

    let [cart, setCart] = useState(localCart);

    const [total, setTotal] = useState(0)

    useEffect(() => {
        setTotal(
            cart.reduce(function (prev, cur) {
                return prev + cur.price * cur.quantity;
            }, 0))
    }, [])

    const addQty = (item) => {
        let cartCopy = [...cart];

        let { id } = item;

        let existingItem = cartCopy.find((cartItem) => cartItem.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
            setTotal(total + item.price)
        }

        setCart(cartCopy);

        const replacerFunc = () => {
            const visited = new WeakSet();
            return (key, value) => {
                if (typeof value === "object" && value !== null) {
                    if (visited.has(value)) {
                        return;
                    }
                    visited.add(value);
                }
                return value;
            };
        };

        let stringCart = JSON.stringify(cartCopy, replacerFunc());
        localStorage.setItem("Eli", stringCart);

    }

    const delQty = (item) => {
        let cartCopy = [...cart];

        let { id } = item;

        let existingItem = cartCopy.find((cartItem) => cartItem.id === id);


        if (existingItem) {
            existingItem.quantity -= 1;
            setTotal(total - item.price)
        }

        setCart(cartCopy);

        const replacerFunc = () => {
            const visited = new WeakSet();
            return (key, value) => {
                if (typeof value === "object" && value !== null) {
                    if (visited.has(value)) {
                        return;
                    }
                    visited.add(value);
                }
                return value;
            };
        };

        let stringCart = JSON.stringify(cartCopy, replacerFunc());
        localStorage.setItem("Eli", stringCart);
    }

    const removeItem = (item) => {

        let cartCopy = [...cart]

        cartCopy = cartCopy.filter(salam => salam.id != item.id);;

        setCart(cartCopy);

        let cartString = JSON.stringify(cartCopy)
        localStorage.setItem('Eli', cartString)

        window.location.reload()
    }

    return (
        <div className="checkoutRight">
            <div className="orderHeading">

                <h2>Order Summary</h2>
                <p>Price can change depending on shipping method and taxes of your state.</p>

            </div>


            {cart.map(item => (
                <div className="cartProduct" key={item.id}>
                    <div className="cartProductLeft">
                        <div className="cartProductImage">
                            <img src={item.img} alt="" />
                        </div>
                        <p id="remove-btn" onClick={() => removeItem(item)}> <i className="fas fa-times"></i> Remove</p>
                    </div>

                    <div className="cartProudctRight">
                        <h5>{item.title} ({item.quantity})</h5>
                        <svg width="88" height="16" viewBox="0 0 88 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.3341 2.12662C7.38015 1.98059 7.47155 1.85304 7.59503 1.7625C7.71851 1.67197 7.86764 1.62315 8.02076 1.62315C8.17388 1.62315 8.32301 1.67197 8.44649 1.7625C8.56997 1.85304 8.66138 1.98059 8.70743 2.12662L9.94743 5.93995H13.9474C14.106 5.93395 14.2622 5.98004 14.3921 6.07117C14.5221 6.16231 14.6186 6.29347 14.667 6.44462C14.7153 6.59578 14.7129 6.75862 14.66 6.90825C14.6071 7.05789 14.5067 7.18609 14.3741 7.27328L11.1274 9.62661L12.3674 13.4466C12.4165 13.5921 12.4177 13.7495 12.371 13.8958C12.3242 14.042 12.2319 14.1695 12.1076 14.2596C11.9832 14.3497 11.8333 14.3977 11.6798 14.3965C11.5263 14.3954 11.3771 14.3452 11.2541 14.2533L8.00076 11.8733L4.7541 14.2333C4.6311 14.3252 4.48194 14.3754 4.32839 14.3765C4.17484 14.3777 4.02495 14.3297 3.90061 14.2396C3.77627 14.1495 3.68398 14.022 3.63723 13.8758C3.59049 13.7295 3.59172 13.5721 3.64076 13.4266L4.88076 9.60661L1.6341 7.25328C1.50148 7.16609 1.40106 7.03789 1.34818 6.88825C1.29529 6.73862 1.29284 6.57578 1.34121 6.42463C1.38958 6.27347 1.48611 6.14231 1.61604 6.05117C1.74597 5.96004 1.90217 5.91395 2.06076 5.91995H6.06076L7.3341 2.12662Z" fill="#FDBC15" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M25.3341 2.12662C25.3801 1.98059 25.4715 1.85304 25.595 1.7625C25.7185 1.67197 25.8676 1.62315 26.0208 1.62315C26.1739 1.62315 26.323 1.67197 26.4465 1.7625C26.57 1.85304 26.6614 1.98059 26.7074 2.12662L27.9474 5.93995H31.9474C32.106 5.93395 32.2622 5.98004 32.3921 6.07117C32.5221 6.16231 32.6186 6.29347 32.667 6.44462C32.7153 6.59578 32.7129 6.75862 32.66 6.90825C32.6071 7.05789 32.5067 7.18609 32.3741 7.27328L29.1274 9.62661L30.3674 13.4466C30.4165 13.5921 30.4177 13.7495 30.371 13.8958C30.3242 14.042 30.2319 14.1695 30.1076 14.2596C29.9832 14.3497 29.8333 14.3977 29.6798 14.3965C29.5263 14.3954 29.3771 14.3452 29.2541 14.2533L26.0008 11.8733L22.7541 14.2333C22.6311 14.3252 22.4819 14.3754 22.3284 14.3765C22.1748 14.3777 22.025 14.3297 21.9006 14.2396C21.7763 14.1495 21.684 14.022 21.6372 13.8758C21.5905 13.7295 21.5917 13.5721 21.6408 13.4266L22.8808 9.60661L19.6341 7.25328C19.5015 7.16609 19.4011 7.03789 19.3482 6.88825C19.2953 6.73862 19.2928 6.57578 19.3412 6.42463C19.3896 6.27347 19.4861 6.14231 19.616 6.05117C19.746 5.96004 19.9022 5.91395 20.0608 5.91995H24.0608L25.3341 2.12662Z" fill="#FDBC15" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M43.3341 2.12662C43.3801 1.98059 43.4715 1.85304 43.595 1.7625C43.7185 1.67197 43.8676 1.62315 44.0208 1.62315C44.1739 1.62315 44.323 1.67197 44.4465 1.7625C44.57 1.85304 44.6614 1.98059 44.7074 2.12662L45.9474 5.93995H49.9474C50.106 5.93395 50.2622 5.98004 50.3921 6.07117C50.5221 6.16231 50.6186 6.29347 50.667 6.44462C50.7153 6.59578 50.7129 6.75862 50.66 6.90825C50.6071 7.05789 50.5067 7.18609 50.3741 7.27328L47.1274 9.62661L48.3674 13.4466C48.4165 13.5921 48.4177 13.7495 48.371 13.8958C48.3242 14.042 48.2319 14.1695 48.1076 14.2596C47.9832 14.3497 47.8333 14.3977 47.6798 14.3965C47.5263 14.3954 47.3771 14.3452 47.2541 14.2533L44.0008 11.8733L40.7541 14.2333C40.6311 14.3252 40.4819 14.3754 40.3284 14.3765C40.1748 14.3777 40.025 14.3297 39.9006 14.2396C39.7763 14.1495 39.684 14.022 39.6372 13.8758C39.5905 13.7295 39.5917 13.5721 39.6408 13.4266L40.8808 9.60661L37.6341 7.25328C37.5015 7.16609 37.4011 7.03789 37.3482 6.88825C37.2953 6.73862 37.2928 6.57578 37.3412 6.42463C37.3896 6.27347 37.4861 6.14231 37.616 6.05117C37.746 5.96004 37.9022 5.91395 38.0608 5.91995H42.0608L43.3341 2.12662Z" fill="#FDBC15" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M61.3341 2.12662C61.3801 1.98059 61.4715 1.85304 61.595 1.7625C61.7185 1.67197 61.8676 1.62315 62.0208 1.62315C62.1739 1.62315 62.323 1.67197 62.4465 1.7625C62.57 1.85304 62.6614 1.98059 62.7074 2.12662L63.9474 5.93995H67.9474C68.106 5.93395 68.2622 5.98004 68.3921 6.07117C68.5221 6.16231 68.6186 6.29347 68.667 6.44462C68.7153 6.59578 68.7129 6.75862 68.66 6.90825C68.6071 7.05789 68.5067 7.18609 68.3741 7.27328L65.1274 9.62661L66.3674 13.4466C66.4165 13.5921 66.4177 13.7495 66.371 13.8958C66.3242 14.042 66.2319 14.1695 66.1076 14.2596C65.9832 14.3497 65.8333 14.3977 65.6798 14.3965C65.5263 14.3954 65.3771 14.3452 65.2541 14.2533L62.0008 11.8733L58.7541 14.2333C58.6311 14.3252 58.4819 14.3754 58.3284 14.3765C58.1748 14.3777 58.025 14.3297 57.9006 14.2396C57.7763 14.1495 57.684 14.022 57.6372 13.8758C57.5905 13.7295 57.5917 13.5721 57.6408 13.4266L58.8808 9.60661L55.6341 7.25328C55.5015 7.16609 55.4011 7.03789 55.3482 6.88825C55.2953 6.73862 55.2928 6.57578 55.3412 6.42463C55.3896 6.27347 55.4861 6.14231 55.616 6.05117C55.746 5.96004 55.9022 5.91395 56.0608 5.91995H60.0608L61.3341 2.12662Z" fill="#FDBC15" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M79.3341 2.12662C79.3801 1.98059 79.4715 1.85304 79.595 1.7625C79.7185 1.67197 79.8676 1.62315 80.0208 1.62315C80.1739 1.62315 80.323 1.67197 80.4465 1.7625C80.57 1.85304 80.6614 1.98059 80.7074 2.12662L81.9474 5.93995H85.9474C86.106 5.93395 86.2622 5.98004 86.3921 6.07117C86.5221 6.16231 86.6186 6.29347 86.667 6.44463C86.7153 6.59578 86.7129 6.75862 86.66 6.90825C86.6071 7.05789 86.5067 7.18609 86.3741 7.27328L83.1274 9.62661L84.3674 13.4466C84.4165 13.5921 84.4177 13.7495 84.371 13.8958C84.3242 14.042 84.2319 14.1695 84.1076 14.2596C83.9832 14.3497 83.8333 14.3977 83.6798 14.3965C83.5263 14.3954 83.3771 14.3452 83.2541 14.2533L80.0008 11.8733L76.7541 14.2333C76.6311 14.3252 76.4819 14.3754 76.3284 14.3765C76.1748 14.3777 76.025 14.3297 75.9006 14.2396C75.7763 14.1495 75.684 14.022 75.6372 13.8758C75.5905 13.7295 75.5917 13.5721 75.6408 13.4266L76.8808 9.60661L73.6341 7.25328C73.5015 7.16609 73.4011 7.03789 73.3482 6.88825C73.2953 6.73862 73.2928 6.57578 73.3412 6.42463C73.3896 6.27347 73.4861 6.14231 73.616 6.05117C73.746 5.96004 73.9022 5.91395 74.0608 5.91995H78.0608L79.3341 2.12662Z" stroke="#EBEBEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        <p>{item.price} USD</p>
                    </div>

                    <div className="cartProductEnd">
                        <button onClick={() => delQty(item)}>-</button>

                        <button onClick={() => addQty(item)}>+</button>
                    </div>
                </div>
            ))
            }

            <div className="cartTotal">
                <h2>Total Order <br />{parseFloat(total).toFixed(2)} <span>$</span></h2>
            </div>

            <div className="removeAll">
                <button>Empty cart</button>
            </div>

        </div>
    )
}

export default CheckoutRight
