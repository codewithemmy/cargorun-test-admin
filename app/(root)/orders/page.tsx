'use client'
import React, {useState, useEffect} from 'react'
import TableOfOrders from '@/components/TableOfOrders'

const Page = () => {

  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard',);
        const result = await response.json();

        if (response.ok) {
          setData(result.order);
        } else {
          setError(result.error || 'Failed to fetch data');
        }
      } catch (err) {
        setError('An error occurred');
      }
    };

    fetchData();
  }, []);


  const [filter, setFilter] = useState('All Orders')

  const filters = [
    {
      name: 'All Orders'
    },
    {
      name: 'pending'
    },
    {
      name: 'delivered'
    },
    {
      name: 'cancelled'
    }
  ]

  return (
    <div className='mt-4'>

      <div className='flex flex-row flex-wrap items-center gap-4'>
        <p className='font-semibold text-xl'>Filters:</p>
        {
          filters.map((item)=>(
            <button key={item.name} className={`p-2 px-4 rounded-xl bar-border uppercase ${filter === item.name && 'bg-selected'}`} onClick={()=>setFilter(item.name)}>{item.name}</button>
          ))
        }
      </div>
      <TableOfOrders data={data} filter={filter} />
    </div>
  )
}

export default Page