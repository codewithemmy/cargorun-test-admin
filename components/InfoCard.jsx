/**
 * v0 by Vercel.
 * @see https://v0.dev/t/G7a2Z56Ogg1
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import React, {useState} from 'react'
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
export default function Component({message, success}) {

    const router = useRouter()

    const [display, setDisplay] = useState(true)

    return (
      <div className={`${!display && 'hidden'} fixed top-0 left-1/2 z-50 w-[500px] -translate-x-1/2 rounded-lg bg-white shadow-lg`}>
        <div className={`${!display && 'hidden'} px-6 py-4 w-full`}>
          <div className="flex items-center justify-between">
            <div className="flex flex-row items-center gap-3">
                {
                    success && <CircleCheckIcon className="h-6 w-6 text-primary-green mr-4" />
                }
              
              <h3 className="ml-3 text-md font-medium text-foreground">{message}</h3>
            </div>
            <button
              type="button"
              onClick={()=>setDisplay(false)}
              className="rounded-md bg-muted p-2 text-muted-foreground hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-muted focus:ring-offset-2"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
          { success && <Button onClick={()=>router.push('/sign-in')} className="w-full bg-primary-blue text-white mt-2">Log in</Button> }
          
        </div>
      </div>
    )
  }
  
  function CircleCheckIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  }
  
  
  function XIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    )
  }