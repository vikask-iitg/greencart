// import React, { useEffect, useState } from 'react'
// import { useAppContext } from '../../context/AppContext'
// import toast from 'react-hot-toast';

// const SellerLogin = () => {

//     const { isSeller, setIsSeller, navigate, axios } = useAppContext();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const onSubmitHandler = async (event) => {
//         try {
//             event.preventDefault();
//             const { data } = await axios.post('/api/seller/login', { email, password });
//             if (data.success) {
//                 setIsSeller(true);
//                 navigate('/seller');
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//             // toast.error(error.response?.data?.message || 'Login failed');
//         }
//     }

//     useEffect(() => {
//         if (isSeller) {
//             navigate("/seller")
//         }
//     }, [isSeller])

//     return !isSeller && (
//         <form onSubmit={onSubmitHandler}
//             className='min-h-screen flex items-center text-sm text-gray-600'>
//             <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88
//             rounded-lg shadow-xl border border-gray-200'>
//                 <p className='text-2xl font-medium m-auto'>
//                     <span className='text-primary'>Seller </span>
//                     Login
//                 </p>
//                 <div className='w-full'>
//                     <p>Email</p>
//                     <input onChange={(e) => setEmail(e.target.value)} value={email}
//                         type='email' placeholder='Enter your email'
//                         className='border border-gray-200 rounded w-full p-2 mt-1
//                     outline-primary' required></input>
//                 </div>
//                 <div className='w-full'>
//                     <p>Password</p>
//                     <input onChange={(e) => setPassword(e.target.value)} value={password}
//                         type='password' placeholder='Enter you password'
//                         className='border border-gray-200 rounded w-full p-2 mt-1
//                     outline-primary' required></input>
//                 </div>
//                 <button
//                     className='bg-primary text-white w-full py-2 rounded-md 
//                 cursor-pointer'>
//                     Login
//                 </button>
//             </div>
//         </form>
//     )
// }

// export default SellerLogin


import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLogin = () => {
    const { isSeller, setIsSeller, navigate, axios } = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // ✅ Restore seller session on refresh / new tab
    useEffect(() => {
        const checkSellerAuth = async () => {
            try {
                const { data } = await axios.get("/api/seller/is-auth");
                if (data.success) {
                    setIsSeller(true);
                    navigate("/seller"); // go directly to dashboard
                }
            } catch {
                // not logged in → stay on login page
            }
        };

        checkSellerAuth();
    }, []);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post("/api/seller/login", {
                email,
                password,
            });

            if (data.success) {
                setIsSeller(true);
                navigate("/seller");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // ✅ Prevent login page flicker
    if (isSeller) return null;

    return (
        <form
            onSubmit={onSubmitHandler}
            className="min-h-screen flex items-center text-sm text-gray-600"
        >
            <div
                className="flex flex-col gap-5 m-auto items-start p-8 py-12
                min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200"
            >
                <p className="text-2xl font-medium m-auto">
                    <span className="text-primary">Seller </span>Login
                </p>

                <div className="w-full">
                    <p>Email</p>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                    />
                </div>

                <div className="w-full">
                    <p>Password</p>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        required
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                    />
                </div>

                <button className="bg-primary text-white w-full py-2 rounded-md">
                    Login
                </button>
            </div>
        </form>
    );
};

export default SellerLogin;
