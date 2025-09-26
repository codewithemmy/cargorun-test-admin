import Image from "next/image";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const userToken = cookies().get('cargorun_userToken'); 
  if (userToken) {
    redirect('/dashboard')
  } else redirect('sign-in')

}