'use client'
import {z} from 'zod'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import InfoCard from '@/components/InfoCard'

const Signup = () => {

  const router = useRouter();

  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)


  useEffect(()=>{
    const fetchEmail = () => {
        const email = localStorage.getItem('resetEmail')
        if(email){
            setEmail(email)
        }
    }

    fetchEmail();
  }, [])

  const [message, setMessage] = useState('');

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    const response = await fetch('/api/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setLoading(false)
      setMessage('Successfully reset password, login to continue');
      setSuccess(true)
      setEmail('')
      setOtp('');
      setPassword('');
    } else {
      setMessage(data.error || 'Something went wrong, please try again!');
      setLoading(false)
    }
  };



  
  return (
    <>
        {
            message && <InfoCard message={message} success={success} />
        }
        
        <Card className="w-[450px] rounded-2xl">
        <CardHeader className='flex flex-col items-center justify-center space-y-4'>
          <CardTitle>Reset Password &lt;2/2&gt;</CardTitle>
          <CardDescription>Enter the OTP sent to your email and a new password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-6">
              
              <div className="flex flex-col space-y-3">
                <Label htmlFor="name" className='font-thin'>Email Address</Label>
                <Input id="name" className='bg-gray' required placeholder="esteban_schiller@gmail.com" value={email}  />
              </div>
              <div className="flex flex-col space-y-3">
                <Label htmlFor="name" className='font-thin w-full flex flex-row justify-between'><span>OTP</span></Label>
                <Input type='password' className='bg-gray' value={otp} required onChange={(e)=>setOtp(e.target.value)} placeholder="&#9679; &#9679; &#9679; &#9679; &#9679; &#9679;" />
              </div>

              <div className="flex flex-col space-y-3">
                <Label htmlFor="name" className='font-thin w-full flex flex-row justify-between'><span>Password</span></Label>
                <Input type='password' className='bg-gray' value={password} required onChange={(e)=>setPassword(e.target.value)} placeholder="&#9679; &#9679; &#9679; &#9679; &#9679; &#9679;" />
              </div>

            </div>
            <CardFooter className="flex flex-col justify-center items-center space-y-3 mt-4">
          <Button disabled={loading} type='submit' className='w-4/5 text-base bg-primary-blue'>Reset Password</Button>
          <p className='text-sm'>Back to <Link href='/sign-in' className='text-primary-green'>login</Link></p>
        </CardFooter>

          </form>
        </CardContent>
      </Card>  

    </>
    )
}

export default Signup