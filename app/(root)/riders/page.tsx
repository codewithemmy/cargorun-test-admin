'use client'
import React, {useState, useEffect} from 'react'
import TableOfRiders from '@/components/TableOfRiders'

const Page = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  if(data) {
    console.log(data)
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/riders',);
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

  console.log(data)

  return (
    <div>
      <TableOfRiders data={data}/>
    </div>
  )
}

export default Page