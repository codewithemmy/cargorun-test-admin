'use client'
import React, {useState, useEffect} from 'react'
import TableOfCustomers from '@/components/TableOfCustomers'

const Customer = () => {

  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/customers',);
        const result = await response.json();

        if (response.ok) {
          setData(result.data);
          console.log(result.data)
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
    <div>
        <TableOfCustomers data={data}/>
    </div>
  )
}

export default Customer