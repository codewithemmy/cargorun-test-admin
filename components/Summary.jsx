import React from 'react'

const Summary = ({data}) => {
  return (
    <div className='px-4'>
        <h1 className='heading text-primary-blue font-semibold mb-3'>Dashboard</h1>
        <p className='text-[#131313]'>Welcome back to cargo-run admin</p>

        <div className='py-2 flex summary items-center w-full lg:gap-6 gap-4 justify-between mt-4'>

          <div className='w-full py-6 px-8 flex flex-row h-[163px] items-center bg-white gap-4 '>
            <img src='/icons/order_summary.svg' height={84} width={84} alt='order_summary' />
            <div>
              <h1 className='font-semibold heading mb-2'>{data?.totalOrder || ''}</h1>
              <p className='text-base '>Total Orders</p>
              <span className='flex flex-row items-center gap-4'>
                <img src='/icons/up.svg' alt='increase' height={14} width={14} />
                <p className='text-sm font-semibold'>4% (30 Days)</p>
              </span>
            </div>
          </div>

          <div className='w-full p-6 flex flex-row h-[163px] items-center bg-white gap-4 p-4'>
            <img src='/icons/delivered.svg' height={84} width={84} alt='order_summary' />
            <div>
              <h1 className='font-semibold heading mb-2'>{data?.deliveredOrder || ''}</h1>
              <p className='text-base '>Total Delivered</p>
              <span className='flex flex-row items-center gap-4'>
                <img src='/icons/up.svg' alt='increase' height={14} width={14} />
                <p className='text-sm font-semibold'>4% (30 Days)</p>
              </span>
            </div>
          </div>


          <div className='w-full p-6 flex flex-row h-[163px] items-center bg-white gap-4 p-4'>
            <img src='/icons/cancelled.svg' height={84} width={84} alt='order_summary' />
            <div>
              <h1 className='font-semibold heading mb-2'>{data?.cancelledOrder}</h1>
              <p className='text-base '>Total Cancelled</p>
              <span className='flex flex-row items-center gap-4'>
                <img src='/icons/down.svg' alt='increase' height={14} width={14} />
                <p className='text-sm font-semibold'>4% (30 Days)</p>
              </span>
            </div>
          </div>

        </div>
    </div>
  )
}

export default Summary