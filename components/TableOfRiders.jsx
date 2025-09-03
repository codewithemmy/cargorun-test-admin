import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { shortenString } from "@/utils"

export default function Component({data}) {

  const router = useRouter();

  return (
    <Card className="w-full mx-auto mt-8">
      <CardHeader>
        <CardTitle>All Riders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="th">
              <TableHead className="w-[150px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data ? data.map((item) => (
              <TableRow key={item._id} onClick={()=> router.push(`/riders/${item._id}`, { scroll: false })}>
                <TableCell className="font-medium text-blue-500"><span className='text-primary-blue'>{shortenString(item._id)}</span></TableCell>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>
                <img src="/icons/options.svg" alt="options" height={20}width={20} />
                </TableCell>
              </TableRow>

              ))

              : <div>Loading riders data...</div>
            }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}