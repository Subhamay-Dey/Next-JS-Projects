"use client"
import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function SignupPage() {

  
  const router = useRouter()

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
      try {

        setLoading(true);
        const response = await axios.post("/api/users/signup", user);
        toast.success("SignUp successful");
        console.log(response.data);
        
        router.push("/login");
        
      } catch (error:any) {

        console.log("SignUp failed", error.message);
        toast.error(error.message);
        

      } finally {
        setLoading(false);
      }
  }

  useEffect(() => {
    
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
    
  }, [user])

  // Ensuring useRouter() is only called on the client-side
  
  // if (typeof window === 'undefined') return null;
  

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className='mb-6 text-3xl font-bold'>{loading ? "processing" : "SignUp"}</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input 
        className="py-3 px-6 mt-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            placeholder="username"
            />
        <label htmlFor="email">email</label>
        <input 
        className="py-3 px-6 mt-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">password</label>
        <input 
        className="py-3 px-6 mt-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
            <button
            onClick={onSignUp}
            className="px-6 py-3 mt-4 text-lg font-semibold border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No signup" : "Signup"}</button>
            <Link href="/login" className='font-semibold text-lg' >Visit login page</Link>
        </div>
    </>
  )
}

export default SignupPage