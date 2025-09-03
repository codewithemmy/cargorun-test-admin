import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { convertTimestampToCustomFormat } from "@/utils"
import {shortenString} from '@/utils'

export default function Component({data}) {

  const router = useRouter();

  return (
    <Card className="w-full  mx-auto mt-8">
      <CardHeader>
        <CardTitle>Cargorun Ratings</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="w-full">
          <TableHeader>
            <TableRow className="th">
              <TableHead className="w-[150px]">ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Date - Time</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          {data ? 
                  <TableBody>
                    {data.map((row)=> (
                      <TableRow key={row?._id}>
                        <TableCell className="font-medium text-blue-500"><span className='text-primary-blue'>{shortenString(row?._id)}</span></TableCell>
                        <TableCell>{row?.ratedBy.fullName}</TableCell>
                        <TableCell>{row && convertTimestampToCustomFormat(row.createdAt)}</TableCell>
                        <TableCell>{row?.rate}/5</TableCell>
                        <TableCell>
                            {row?.review}
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