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

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage('Sign up successful, click login to continue!');
      setLoading(false)
      setSuccess(true)
    } else {
      setMessage(data.error || 'Something went wrong, please try again!');
    }
  };  

  return (
    <>
      {
        message && <InfoCard message={message} success={success} />
      }

      <Card className="w-[450px] rounded-2xl">
        <CardHeader className='flex flex-col items-center justify-center space-y-4'>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>Create a account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-6">
              
              <div className="flex flex-col space-y-3">
                <Label htmlFor="name" className='font-thin'>Email Address</Label>
                <Input required id="name" className='bg-gray' placeholder="esteban_schiller@gmail.com"value={email} onChange={(e)=>setEmail(e.target.value)} />
              </div>
              <div className="flex flex-col space-y-3">
                <Label htmlFor="name" className='font-thin'>Name</Label>
                <Input required id="name" className='bg-gray' placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
              </div>
              <div className="flex flex-col space-y-3">
                <Label htmlFor="name" className='font-thin'>Password</Label>
                <Input required type='password' id="name" className='bg-gray' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="&#9679; &#9679; &#9679; &#9679; &#9679; &#9679;" />
              </div>

            </div>
            <CardFooter className="flex flex-col justify-center items-center space-y-3 mt-4">
          <Button disabled={loading} type='submit' className='w-4/5 text-base bg-primary-blue'>Sign Up</Button>
          <p className='text-sm'>Already have an account? <Link href='/sign-in' className='text-primary-green'>Login</Link></p>
        </CardFooter>

          </form>
        </CardContent>
      </Card>  

    </>
    )
}

export default Signup