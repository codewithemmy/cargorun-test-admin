'use client'
import React, {useEffect, useState} from 'react'
import TableOfReviews from '@/components/TableOfRatings'

type Rating = {
  rate: number;
  review: string;
  _id: string;
  ratedBy: {
    fullName: string;
    phone: string
  }
  createdAt: string;
}[];
 
const Page = () => {

  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/ratings',);
        const result = await response.json();

        if (response.ok) {
          setData(result.data);
        } else {
          setError(result.error || 'Failed to fetch data');
        }
      } catch (err) {
        setError('An error occurred');
      }
    };

    fetchData();
  }, []);

  return (
    <div className='px-4'>
    <h1 className='heading text-primary-blue font-semibold mb-3'>Reviews</h1>
    <p className='text-[#131313]'>Welcome to reviews, reviews will show up here</p>
      <TableOfReviews data={data} />
    </div>

  )
}

export default Page