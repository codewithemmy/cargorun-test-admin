import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { shortenString } from "@/utils";

export default function Component({ data }) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  // Filter riders
  const filteredData = data?.filter(
    (item) =>
      item.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      item.email?.toLowerCase().includes(search.toLowerCase()) ||
      item.phone?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="w-full mx-auto mt-8">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <CardTitle className="mb-20">All Riders</CardTitle>

        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRow
                  className="cursor-pointer"
                  style={{ borderBottom: "1px solid #e0e0e0" }}
                  key={item._id}
                  onClick={() =>
                    router.push(`/riders/${item._id}`, { scroll: false })
                  }
                >
                  <TableCell className="cursor-pointer font-medium text-blue-500">
                    <span className="text-primary-blue">
                      {shortenString(item._id)}
                    </span>
                  </TableCell>
                  <TableCell>{item.fullName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>
                    <img
                      src="/icons/options.svg"
                      alt="options"
                      height={20}
                      width={20}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  {data ? "No matching riders found" : "Loading riders data..."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
