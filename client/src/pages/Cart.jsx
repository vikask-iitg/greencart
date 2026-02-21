import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets, dummyAddress } from '../assets/assets';
import toast from 'react-hot-toast';

const Cart = () => {
    const {
        products,
        currency,
        cartItems,
        removeFromCart,
        getCartCount,
        getCartAmount,
        updateCartItem,
        navigate,
        axios,
        user,
        setCartItems
    } = useAppContext();

    const [cartArray, setCartArray] = useState([]);
    const [addresses, setAddresses] = useState(dummyAddress);
    const [showAddress, setShowAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentOption, setPaymentOption] = useState("COD");

    // ADDRESS VALIDATION FLAG
    const hasValidAddress = Boolean(selectedAddress && selectedAddress._id);

    const getCart = () => {
        const tempArray = [];
        for (const key in cartItems) {
            const product = products.find(p => p._id === key);
            if (product) {
                tempArray.push({
                    ...product,
                    quantity: cartItems[key],
                });
            }
        }
        setCartArray(tempArray);
    };

    const getUserAddress = async () => {
        try {
            const { data } = await axios.get('/api/address/get');
            if (data.success) {
                setAddresses(data.addresses);
                if (data.addresses.length > 0) {
                    setSelectedAddress(data.addresses[0]);
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const placeOrder = async () => {
        try {
            if (!hasValidAddress) {
                toast.error("Please add a delivery address before placing the order");
                navigate('/add-address');
                return;
            }

            if (paymentOption === "COD") {
                const { data } = await axios.post('/api/order/cod', {
                    items: cartArray.map(item => ({
                        product: item._id,
                        quantity: item.quantity
                    })),
                    address: selectedAddress._id
                });

                if (data.success) {
                    toast.success(data.message);
                    setCartItems({});
                    navigate('/my-orders');
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post('/api/order/stripe', {
                    items: cartArray.map(item => ({
                        product: item._id,
                        quantity: item.quantity
                    })),
                    address: selectedAddress._id
                });

                if (data.success) {
                    window.location.replace(data.url);
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (products.length > 0 && cartItems) {
            getCart();
        }
    }, [products, cartItems]);

    useEffect(() => {
        if (user) {
            getUserAddress();
        }
    }, [user]);

    return (products.length > 0 && cartItems) ? (
        <div className="flex flex-col md:flex-row mt-16">

            {/* CART ITEMS */}
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-indigo-500">{getCartCount()} items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p>Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] items-center text-sm md:text-base pt-3">
                        <div className="flex gap-4">
                            <img
                                src={product.image[0]}
                                alt={product.name}
                                className="w-20 h-20 border rounded cursor-pointer"
                                onClick={() => navigate(`/products/${product.category.toLowerCase()}/${product._id}`)}
                            />
                            <div>
                                <p className="font-semibold">{product.name}</p>
                                <p className="text-gray-500">Qty:
                                    <select
                                        value={cartItems[product._id]}
                                        onChange={(e) => updateCartItem(product._id, Number(e.target.value))}
                                        className="ml-2 outline-none"
                                    >
                                        {Array(9).fill('').map((_, i) => (
                                            <option key={i} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </select>
                                </p>
                            </div>
                        </div>
                        <p className="text-center">{currency}{product.offerPrice * product.quantity}</p>
                        <button onClick={() => removeFromCart(product._id)}>
                            <img src={assets.remove_icon} className="w-6 h-6 mx-auto" />
                        </button>
                    </div>
                ))}
            </div>

            {/* ORDER SUMMARY */}
            <div className="max-w-90 w-full bg-gray-100/40 p-5 mt-10 md:mt-0 border border-gray-300">

                <h2 className="text-xl font-medium">Order Summary</h2>
                <hr className="my-4 border-gray-300" />

                {/* ADDRESS */}
                <p className="text-sm font-medium uppercase">Delivery Address</p>
                <div className="relative mt-2">
                    <p className={`text-sm ${hasValidAddress ? "text-gray-600" : "text-red-500"}`}>
                        {hasValidAddress
                            ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                            : "Please add or select a delivery address"}
                    </p>

                    <button
                        onClick={() => setShowAddress(!showAddress)}
                        className="text-primary text-sm mt-1"
                    >
                        Change
                    </button>

                    {showAddress && (
                        <div className="absolute top-12 bg-white border w-full z-10 border-gray-300">
                            {addresses.map((address, index) => (
                                <p
                                    key={index}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        setSelectedAddress(address);
                                        setShowAddress(false);
                                    }}
                                >
                                    {address.street}, {address.city}
                                </p>
                            ))}
                            <p
                                className="text-primary text-center p-2 cursor-pointer "
                                onClick={() => navigate('/add-address')}
                            >
                                Add Address
                            </p>
                        </div>
                    )}
                </div>

                {/* PAYMENT */}
                <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
                <select
                    className="w-full mt-2 border px-3 py-2  border-gray-300"
                    onChange={(e) => setPaymentOption(e.target.value)}
                >
                    <option value="COD">Cash On Delivery</option>
                    <option value="Online">Online Payment</option>
                </select>

                <hr className="my-4 border-gray-300" />

                {/* TOTAL */}
                <div className="text-gray-500 mt-4 space-y-2 text-sm">
                    <p className="flex justify-between">
                        <span>Price</span>
                        <span>{currency}{getCartAmount().toFixed(2)}</span>
                    </p>

                    <p className="flex justify-between">
                        <span>Shipping Fee</span>
                        <span className="text-green-600">Free</span>
                    </p>

                    <p className="flex justify-between">
                        <span>Tax (2%)</span>
                        <span>{currency}{(getCartAmount() * 0.02).toFixed(2)}</span>
                    </p>

                    <p className="flex justify-between text-lg font-medium mt-3 text-gray-800">
                        <span>Total Amount:</span>
                        <span>
                            {currency}{(getCartAmount() * 1.02).toFixed(2)}
                        </span>
                    </p>
                </div>



                {/* BUTTON */}
                <button
                    onClick={placeOrder}
                    disabled={!hasValidAddress}
                    className={`w-full py-3 mt-6 font-medium transition
                        ${hasValidAddress
                            ? "bg-primary text-white hover:bg-primary-dull"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
                </button>
            </div>
        </div>
    ) : null;
};

export default Cart;
