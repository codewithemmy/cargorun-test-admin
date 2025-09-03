'use client'
import {z} from 'zod'
import React, { useState } from 'react'
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
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const [message, setMessage] = useState('');

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    const response = await fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    const userData = {
      userName: data.data.name,
      email: data.data.email,
      token: data.data.token,
      id: data.data._id
    };
    localStorage.setItem('cargorun_userData', JSON.stringify(userData))

    if (response.ok) {
      setLoading(false)
      router.push('/dashboard')
    } else {
      setMessage(data.error || 'Something went wrong!');
    }
  };



  
  return (
      <>
      {
        message && <InfoCard message={message} success={false} />
      }
            <Card className="w-[450px] rounded-2xl">
        <CardHeader className='flex flex-col items-center justify-center space-y-4'>
          <CardTitle>Login to Account</CardTitle>
          <CardDescription>Please enter your email and password to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-6">
              
              <div className="flex flex-col space-y-3">
                <Label htmlFor="name" className='font-thin'>Email Address</Label>
                <Input id="name" className='bg-gray' required placeholder="esteban_schiller@gmail.com"value={email} onChange={(e)=>setEmail(e.target.value)} />
              </div>
              <div className="flex flex-col space-y-3">
                <Label htmlFor="name" className='font-thin w-full flex flex-row justify-between'><span>Password</span><Link href='/forgot-password' className='text-primary-blue text-xs'>Forgot Password?</Link></Label>
                <Input type='password' className='bg-gray' value={password} required onChange={(e)=>setPassword(e.target.value)} placeholder="&#9679; &#9679; &#9679; &#9679; &#9679; &#9679;" />
              </div>

            </div>
            <CardFooter className="flex flex-col justify-center items-center space-y-3 mt-4">
          <Button disabled={loading} type='submit' className='w-4/5 text-base bg-primary-blue'>Sign In</Button>
          <p className='text-sm'>Don&apos;t have an account? <Link href='/sign-up' className='text-primary-green'>Create Account</Link></p>
        </CardFooter>

          </form>
        </CardContent>
      </Card>  

      </>
    )
}

export default Signup