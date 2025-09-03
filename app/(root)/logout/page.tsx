'use client'
import React, { useState, useEffect, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

type User = {
  name?: string;
  email?: string;
  token?: string;
  image?: string;
  id?: string; // Added id as it is used in the code
} | ''

const Page: React.FC = () => {
    const [details, setDetails] = useState<User>('')
    const [id, setId] = useState<string>('')

    useEffect(() => {
      function getUserData() {
        const userDataString = localStorage.getItem('cargorun_userData');
        if (userDataString) {
          const parsedObject = JSON.parse(userDataString) as User;
          setDetails(parsedObject);
          if (parsedObject !== '' && 'id' in parsedObject) {
            setId(parsedObject.id ?? '');
          }
        }
      }
      getUserData();
    }, [])

    const router = useRouter()

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [name, setName] = useState<string | undefined>(details !== '' ? details.name : undefined)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [filename, setFileName] = useState<string>('')

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsEditing(true)
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
            setFileName(event.target.files[0].name)
        }
    };

    console.log(details)

    const handleSubmit = async () => {
        if (selectedFile && name) {
            const formData = new FormData();
            formData.append('image', selectedFile);
            formData.append('name', name)
        
            const response = await fetch(`https://cargo-run-d699d9f38fb5.herokuapp.com/api/v1/admin/${id}`, {
                headers: {'Authorization': `Bearer ${details !== '' ? details.token : ''}`},
                method: 'PATCH',
                body: formData,
            });
        
            const data = await response.json();
            if (data) {
                refetchUser();
                setIsEditing(false);
            }
        }
    }

    const refetchUser = async () => {
        const res = await fetch('/api/fetch_user')
        const data = await res.json();

        const userData = {
            name: data.data[0].name,
            image: data.data[0].image,
            email: data.data[0].email,
            id: data.data[0]._id
        }

        localStorage.setItem('cargorun_userData', JSON.stringify(userData))
        setDetails(userData)
    }

    const handleLogout = async () => {
        const response = await fetch('/api/logout', {
            method: 'POST',
        });
    
        if (response.ok) {
            // Clear client-side tokens or any other necessary cleanup
            localStorage.removeItem('cargorun_userData');
            // Redirect to the login page or homepage
            router.push('/sign-in');
        } else {
            const data = await response.json();
            console.error(data.error || 'Logout failed');
        }
    };

    return (
        <div className='p-8'>
            <h1 className='heading text-primary-blue font-semibold'>Account</h1>
            <div className='flex flex-col items-center mt-8'>
                <div className='relative'>
                    <img src={`${details !== '' && details.image ? details.image : '/icons/profile.png' }`} alt='display picture' height={180} width={180} className='rou' />
                    <Button
                    variant="outline"
                    size="icon"
                    className="absolute bottom-0 right-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-white"
                    >
                        <UploadIcon className="h-5 w-5" />
                        <input type="file" className="absolute inset-0 cursor-pointer opacity-0" onChange={handleFileChange} accept="image/*" />
                    </Button>
                </div>
                <h2 className='text-sm mt-0'>{filename}</h2>

                <div className='mt-12 account-box flex flex-col min-w-[506px]'>
                    <div className='bg-primary-green text-white px-6 py-2 overflow-hidden'>Account Details</div>
                    <div className='flex flex-row w-full justify-between px-6 py-2'>
                        {
                            isEditing ? <input value={name} onChange={(e)=>setName(e.target.value)} /> : <span>{name}</span>
                        }
                        
                        <button onClick={()=>setIsEditing(true)}><img src='/icons/edit.svg' alt='edit' height={20} width={20} /></button>
                    </div>

                    <div className='flex flex-row w-full justify-between px-6 py-2'>
                        <span>{details !== '' ? details.email : ''}</span>
                    </div>
                    <div className='flex flex-row w-full justify-between px-6 py-2'>
                        <span>Password: <span className='font-semibold'>********</span></span>
                    </div>
                </div>

                {
                    isEditing ? <button onClick={handleSubmit} className='px-6 py-3 mt-8 rounded-xl bg-primary-blue text-white'>Update</button> : <button onClick={handleLogout} className='px-6 py-3 mt-8 rounded-xl bg-red-700 text-white'>Logout</button>
                }
                
            </div>
        </div>
    )
}

function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
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
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" x2="12" y1="3" y2="15" />
        </svg>
    )
}

export default Page
