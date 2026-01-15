import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useState } from "react";

type Props = {
  data: any[];
  onEdit: (row: any) => void;
  onCancel: (row: any) => Promise<void>;
};

const InvitationTable = ({ data,onEdit, onCancel}: Props) => {

 const [cancelRow, setCancelRow] = useState<any>(null);
const [confirmOpen, setConfirmOpen] = useState(false);


const getStatusClass = (statusName: string) => {
  if (statusName === "Cancelled") {
    return "bg-red-100 text-red-700";
  }
  if (statusName === "Invited") {
    return "bg-purple-100 text-purple-700";
  }
  return "bg-gray-100 text-gray-700";
};

const getPurposeClass = () => {
  return "bg-yellow-100 text-yellow-800";
};


  return (
    <>
    <Table>
      <TableHeader className='bg-gray-100'>
        <TableRow>
          <TableHead>Invitation Code</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Visitor Type</TableHead>
          <TableHead>Purpose</TableHead>
          <TableHead>Date</TableHead>
           <TableHead>Location</TableHead>
          <TableHead>Status</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.length < 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              No data
            </TableCell>
          </TableRow>
        ) : (
          data?.map((row) => (
            <TableRow key={row.invite_id}>
              <TableCell>{row.invite_code}</TableCell>
              <TableCell>{row.visitor_name}</TableCell>

              <TableCell>
                <div className="flex flex-col">
                  <span>{row.visitor_email || "-"}</span>
                  <span className="text-xs  text-blue-600">
                    {row.visitor_mobile}
                  </span>
                </div>
              </TableCell>

              <TableCell>{row.visitor_type_name}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getPurposeClass()}`}
                >
                  {row.purpose_name}
                </span>
              </TableCell>


              <TableCell>
              <div className="flex flex-col">
                <span>
                  {new Date(row.invite_date).toLocaleDateString()}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(row.invite_date).toLocaleTimeString()}
                </span>
              </div>
             </TableCell>

              <TableCell>{row.location_name}</TableCell>

              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                    row.status_name
                  )}`}
                >
                  {row.status_name}
                </span>
              </TableCell>

              <TableCell>
                <div className="flex gap-3">
                  
                  {row.status_name === "Invited" && (
                    <div className="flex gap-3">
                  <Pencil
                    className="h-4 w-4 cursor-pointer"
                    onClick={() => onEdit(row)}
                  />

                  <X
                    className="h-4 w-4 cursor-pointer text-red-500"
                    onClick={() => {
                      setCancelRow(row);
                      setConfirmOpen(true);
                    }}
                  />
                  </div>
                    )}        
              </div>
                
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>

    <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Confirm?
        </AlertDialogTitle>
      </AlertDialogHeader>
        Are you sure you want to cancel this invitation?
      <AlertDialogFooter>
        <AlertDialogCancel>No</AlertDialogCancel>

        <AlertDialogAction
          onClick={async () => {
            if (!cancelRow) return;

            await onCancel(cancelRow);

            setConfirmOpen(false);
            setCancelRow(null);
          }}
        >
          Yes
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</>
  );
};

export default InvitationTable;
