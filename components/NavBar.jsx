'use client'
import React, {useState, useEffect} from 'react'
import { Nunito_Sans } from 'next/font/google'
import { getCookie } from '@/utils'
import { defaultMaxListeners } from 'events'
import { useContext } from 'react'


const nunito = Nunito_Sans({subsets: ['latin']})

const NavBar = () => {


  const [details, setDetails] = useState('')

  useEffect(() => {
    function getUserData() {
      const userDataString = localStorage.getItem('cargorun_userData');
      if (userDataString) {
        setDetails(JSON.parse(userDataString));
      }
      return null;
    }
    getUserData();
  }, [])


  return (
      <div className={`${nunito.className} navbar w-full py-4 px-8 flex flex-row items-center justify-between`}>
        <div></div>

        <div className='flex flex-row items-center w-1/3 justify-between'>
            <img src='/icons/notifs.svg' alt='notifs' height={30} width={30} />
            <div className='flex flex-row px-6 gap-6'>
                <img src='/icons/profile.png' alt='user' height={44} width={44} />
                <div>
                    <h2 className='text-base font-semibold'>{details.userName}</h2>
                    <p className='text-sm font-thin'>Admin</p>
                </div>
                <img src='/icons/more.svg' alt='more' height={24} width={24} />
            </div>
        </div>
    </div>

  )
}

export default NavBar