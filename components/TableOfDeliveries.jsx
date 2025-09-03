import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { convertTimestampToCustomFormat } from "@/utils"
import { useEffect, useState } from "react"

export default function Component({data}) {

  const router = useRouter();

  return (
    <Card className="w-full  mx-auto mt-8">
      <CardHeader>
        <CardTitle>Recent Deliveries</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="w-full">
          <TableHeader>
            <TableRow className="th">
              <TableHead className="w-[150px]">Order</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Date - Time</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          {data ? 
                  <TableBody>
                    {data.map((row)=> (
                      <TableRow key={row?.orderId} onClick={()=> router.push(`/orders/${row._id}`, { scroll: false })}>
                        <TableCell className="font-medium text-blue-500">Order <span className='text-primary-blue'>{row?.orderId}</span></TableCell>
                        <TableCell>{row?.receiverDetails.address}</TableCell>
                        <TableCell>{row && convertTimestampToCustomFormat(row.createdAt)}</TableCell>
                        <TableCell>{row?.deliveryFee}</TableCell>
                        <TableCell>
                          <Button className={`${row?.status === 'delivered' && 'delivered'} ${row?.status === 'pending' && 'pending'} ${row?.status === 'pending' && 'bg-red-500'} text-white rounded-2xl`}>{row?.status}</Button>
                        </TableCell>
                      </TableRow>
                      
                    ))}
                  </TableBody>
        
          : <div>Loading Table data...</div>
          }
        </Table>
      </CardContent>
    </Card>
  )
}