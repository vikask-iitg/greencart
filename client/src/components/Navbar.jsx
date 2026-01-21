import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const [showProfileMenu, setShowProfileMenu] = useState(false)

    const profileRef = useRef(null)
    const hideTimeoutRef = useRef(null)

    const {
        user,
        setUser,
        setShowUserLogin,
        navigate,
        searchQuery,
        setSearchQuery,
        getCartCount,
    } = useAppContext()

    const logout = async () => {
        setUser(null)
        setShowProfileMenu(false)
        navigate('/')
    }

    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate('/products')
        }
    }, [searchQuery, navigate])

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileMenu(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Hover handlers with delay
    const handleMouseEnter = () => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current)
            hideTimeoutRef.current = null
        }
        setShowProfileMenu(true)
    }

    const handleMouseLeave = () => {
        hideTimeoutRef.current = setTimeout(() => {
            setShowProfileMenu(false)
        }, 200) 
    }

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative">

            {/* Logo */}
            <NavLink to="/" onClick={() => setOpen(false)}>
                <img className="h-9" src={assets.logo} alt="logo" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">

                <button
                    type="button"
                    onClick={() => navigate('/seller/')}
                    className="border border-gray-300 rounded-full px-4 py-1 text-sm hover:bg-gray-100"
                >
                    Seller Dashboard
                </button>

                <NavLink to="/">Home</NavLink>
                <NavLink to="/products">All Products</NavLink>
                <NavLink to="/">Contact</NavLink>

                {/* Search */}
                <div className="hidden lg:flex items-center gap-2 border border-gray-300 px-3 rounded-full">
                    <input
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="py-1.5 w-full bg-transparent outline-none text-sm"
                        type="text"
                        placeholder="Search products"
                    />
                    <img src={assets.search_icon} alt="search" className="w-4 h-4" />
                </div>

                {/* Cart */}
                <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt="cart" />
                    <span className="absolute -top-2 -right-3 text-xs text-white bg-primary 
                    w-4.5 h-4.5 rounded-full flex items-center justify-center">
                        {getCartCount()}
                    </span>
                </div>

                {/* Auth Section */}
                {!user ? (
                    <button
                        onClick={() => setShowUserLogin(true)}
                        className="px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
                    >
                        Login
                    </button>
                ) : (
                    <div
                        ref={profileRef}
                        className="relative"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img
                            src={assets.profile_icon}
                            alt="profile"
                            className="w-10 cursor-pointer"
                            onClick={() => setShowProfileMenu(prev => !prev)}
                        />

                        {showProfileMenu && (
                            <ul
                                className="absolute top-11 right-0 bg-white shadow-lg border border-gray-200 py-2 w-36 rounded-md text-sm z-50"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <li
                                    onClick={() => {
                                        navigate('/my-orders')
                                        setShowProfileMenu(false)
                                    }}
                                    className="px-4 py-2 hover:bg-primary/10 cursor-pointer"
                                >
                                    My Orders
                                </li>

                                <li
                                    onClick={() => {
                                        logout()
                                        setShowProfileMenu(false)
                                    }}
                                    className="px-4 py-2 hover:bg-primary/10 cursor-pointer"
                                >
                                    Logout
                                </li>
                            </ul>
                        )}
                    </div>
                )}
            </div>

            {/* Mobile Icons */}
            <div className="flex items-center gap-5 sm:hidden">
                <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt="cart" />
                    <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
                        {getCartCount()}
                    </span>
                </div>

                <button onClick={() => setOpen(!open)} aria-label="Menu">
                    <img src={assets.menu_icon} alt="menu" />
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex flex-col gap-2 px-5 text-sm sm:hidden z-40">
                    <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
                    <NavLink to="/products" onClick={() => setOpen(false)}>All Products</NavLink>
                    <NavLink to="/" onClick={() => setOpen(false)}>Contact</NavLink>

                    {user && (
                        <NavLink to="/my-orders" onClick={() => setOpen(false)}>
                            My Orders
                        </NavLink>
                    )}

                    {!user ? (
                        <button
                            onClick={() => {
                                setOpen(false)
                                setShowUserLogin(true)
                            }}
                            className="px-6 py-2 mt-2 bg-primary text-white rounded-full"
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                logout()
                                setOpen(false)
                            }}
                            className="px-6 py-2 mt-2 bg-primary text-white rounded-full"
                        >
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navbar
