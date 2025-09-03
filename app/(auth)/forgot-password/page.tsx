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

const Signup = () => {

  const router = useRouter();

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const [message, setMessage] = useState({});

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    const response = await fetch('/api/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      setLoading(false)
      localStorage.setItem('resetEmail', email)
      router.push('/reset-password')
    } else {
      setMessage(data.error || 'Something went wrong!');
    }
  };



  
  return (
      <Card className="w-[450px] rounded-2xl">
        <CardHeader className='flex flex-col items-center justify-center space-y-4'>
          <CardTitle>Reset Password &lt;1/2&gt;</CardTitle>
          <CardDescription>Please enter your email to reset password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-6">
              
              <div className="flex flex-col space-y-3">
                <Label htmlFor="name" className='font-thin'>Email Address</Label>
                <Input id="name" className='bg-gray' required placeholder="esteban_schiller@gmail.com"value={email} onChange={(e)=>setEmail(e.target.value)} />
              </div>
            </div>
            <CardFooter className="flex flex-col justify-center items-center space-y-3 mt-4">
          <Button disabled={loading} type='submit' className='w-4/5 text-base bg-primary-blue'>Continue</Button>
          <p className='text-sm'>Don&apos;t have an account? <Link href='/sign-up' className='text-primary-green'>Create Account</Link></p>
        </CardFooter>

          </form>
        </CardContent>
      </Card>  
    )
}

export default Signup