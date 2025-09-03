'use client'
import React, {useEffect, useState} from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import BarChart from "@/components/Barchart"
import Summary from '@/components/Summary'
import { Barlow } from 'next/font/google'
import TableOfDeliveries from '@/components/TableOfDeliveries'


const barlow = Barlow({weight: ['200'],subsets: ['latin']})

const Dashboard = () => {

  const [data, setData] = useState(null)
  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard',);
        const result = await response.json();

        if (response.ok) {
          setData(result.data);
          setOrder(result.order)
        } else {
          setError(result.error || 'Failed to fetch data');
        }
      } catch (err) {
        setError('An error occurred');
      }
    };

    fetchData();
  }, []);

  if (error) {
    console.log(error)
  }


  return (
    <main className='pt-3'>
      <Summary data={data} />
      <Card className={`${barlow.className} h-fit w-full mt-4 p-4`}>
        <CardHeader>
          <CardTitle className='text-primary-blue font-semibold'>Total Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='p-6 bar-border'>
            <BarChart className="aspect-[9/4]" />

          </div>
        </CardContent>
      </Card>
      <TableOfDeliveries data={order}  />

    </main>

  )
}

export default Dashboard


