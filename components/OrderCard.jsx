/**
 * v0 by Vercel.
 * @see https://v0.dev/t/2UOoqg0sah7
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDateString } from '@/utils'

export default function Component({deliveryStatus, paymentStatus, trackingId, deliveryService, deliveryOption, created, updated}) {
  return (
    <Card className="order-card">
      <CardHeader className="flex items-center justify-between">
        <div className="justify-center items-center text-center">
          <CardTitle>About this order</CardTitle>
          <CardDescription className="mt-2">Placed on {formatDateString(created)}</CardDescription>
        </div>
        <Badge variant="outline" className="bg-green-100 text-green-600">
          {deliveryStatus}
        </Badge>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <div className="font-semibold">Delivery Status</div>
            <div>{deliveryStatus}</div>
          </div>
          <div className="grid gap-1">
            <div className="font-semibold">Payment Status</div>
            <div>{paymentStatus}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <div className="font-semibold">Tracking ID</div>
            <div>{trackingId}</div>
          </div>
          <div className="grid gap-1">
            <div className="font-semibold">Delivery Service</div>
            <div>{deliveryService}</div>
          </div>
        </div>
        <div className="grid gap-1">
          <div className="font-semibold">Delivery Option</div>
          <div>{deliveryOption}</div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="text-xs font-semibold">
          Updated <time dateTime="2023-06-15">{formatDateString(updated)}</time>
        </div>
      </CardFooter>
    </Card>
  )
}

function ChevronLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}


function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}