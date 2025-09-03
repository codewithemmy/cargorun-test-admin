'use client'
import React from 'react'
import Image from 'next/image'
import {usePathname} from 'next/navigation'
import Link from 'next/link'
import { Barlow } from 'next/font/google'

const navItems = [
    {
        name: 'Dashboard',
        link: '/dashboard',
        icon: '/icons/dashboard-black.svg',
        white: '/icons/dashboard.svg'
    },
    {
        name: 'Order List',
        link: '/orders',
        icon: '/icons/orderlist.svg',
        white: '/icons/order-white.svg'
    },
    {
        name: 'Customers',
        link: '/customers',
        icon: '/icons/customer.svg',
        white: '/icons/customer-white.svg'
    },
    {
        name: 'Reviews',
        link: '/reviews',
        icon: '/icons/reviews.svg',
        white: '/icons/reviews-white.svg'
    },
    {
        name: 'Riders',
        link: '/riders',
        icon: '/icons/riders.svg',
        white: '/icons/customer-white.svg'
    },
    {
        name: 'Chats',
        link: '/chats',
        icon: '/icons/chat.svg',
        white: '/icons/chat.svg'
    },
    {
        name: 'Settings',
        link: '/settings',
        icon: '/icons/settings.svg',
        white: '/icons/settings.svg'
    },
    {
        name: 'Logout',
        link: '/logout',
        icon: '/icons/logout.svg',
        white: '/icons/logout.svg'
    },

]

const barlow = Barlow({weight: ['500'], subsets: ['latin']})

const SideNav = () => {

    const pathname = usePathname()

  return (
    <div className={`${barlow.className} h-screen w-[22vw] bg-white py-10 px-2 flex flex-col items-center fixed top-0 left-0 bottom-0`}>
        <Image alt='Cargo-run Logo' src='/images/logo-color.png' width={200} height={200} />

        <div className='flex flex-col space-y-6 mt-8 w-full px-6'>
            {
                navItems.map((item)=>(
                    <Link href={item.link} key={item.name} className={`flex flex-row gap-4 w-full items-center rounded-md min-w-sm px-4 py-2 ${pathname === item.link && 'bg-primary-blue opacity-90'}`}>
                        <Image src={pathname === item.link ? item.white : item.icon} alt={item.name} height={20} width={20} />
                        <span className={`${pathname == item.link ? 'text-white' : 'text-black'} hidden lg:flex`}>{item.name}</span>
                    </Link>
                ))
            }
        </div>
    </div>
  )
}

export default SideNav