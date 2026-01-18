"use client";

import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import Loader from "@/components/ui/loader";
import InvitationHeader from "@/src/components/generic/header/InvitationHeader";
import InvitationForm from "@/src/components/generic/form/InvitationForm";
import InvitationTable from "@/src/components/generic/table/InvitationTable";
import CrudService from "@/src/services/crud.service";
import { CrudModules } from "@/src/core/constant";
import useCrud from "@/src/hooks/useCrud";


const crudService = new CrudService();

export default function Invitation() {
  const [tableData, setTableData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  //const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);   

  const {
  data,
  load,
  loading,
  cancel,
  totalPages,
} = useCrud<any>(CrudModules.InvitationView);

    
  /*const fetchData = async (page:number) => {
    try {
    setLoading(true); 
    const res =await crudService.items<any[]>(CrudModules.InvitationView, {
    page: page,
    limit: limit,
    sorts: [
      { field: "invite_id", order: "DESC" }
    ],

    fields: [
    "invite_id",
    "invite_code",
    "visitor_name",
    "visitor_mobile",
    "visitor_email",
    "visitor_type_name",
    "visitor_type",
    "purpose_name",
    "purpose_id",
    "invite_date",
    "location_name",
    "location_id",
    "status_name",
    "status",
    "visit_id",
    "comment",
  ],
  });
      console.log(res);
      setTableData(res.data.data);

    const totalRecords = res.data.total ??  10;
    setTotalPages(Math.ceil(totalRecords / limit));

    } catch (err) {
      toast.error("Failed to fetch invitations.");
    }
    setLoading(false);
  };*/

  useEffect(() => {
    load({
    page,
    limit,
    sorts: [{ field: "invite_id", order: "DESC" }],
    fields: [
    "invite_id",
    "invite_code",
    "visitor_name",
    "visitor_mobile",
    "visitor_email",
    "visitor_type_name",
    "visitor_type",
    "purpose_name",
    "purpose_id",
    "invite_date",
    "location_name",
    "location_id",
    "status_name",
    "status",
    "visit_id",
    "comment",
  ],
  });
  }, [page]);



const handleCancelInvitation = async (row: any) => {
  try {
    await cancel(row.invite_id, CrudModules.InvitationCancel);

    toast.success("Invitation cancelled successfully!");

    await load({
      page,
      limit,
      sorts: [{ field: "invite_id", order: "DESC" }],
    });

  } catch (err) {
    toast.error("Failed to cancel invitation.");
  }
};



  return (
    <>
      <InvitationHeader onNewClick={() => setOpen(true)} />
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-start pt-10">
          <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 relative">
            <InvitationForm
              onCancel={() => {
                setOpen(false);
                setEditData(null);
              }}
              onSuccess={async () => {
                await load({
                  page,
                  limit,
                  sorts: [{ field: "invite_id", order: "DESC" }],
                });
                setOpen(false);
                setEditData(null);
              }}
              editData={editData}
            />
          </div>
        </div>
      )}
      {loading ? <Loader/> : (
        <>
      <InvitationTable
        data = {data?.data?? []}
        onEdit={(row) => {
          setEditData(row);
          setOpen(true);
        }}
        onCancel={handleCancelInvitation}
      />
      
      <Pagination className="mt-4">
      <PaginationContent>

        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              if (page > 1) setPage(page - 1);
            }}
          />
        </PaginationItem>

        <PaginationItem>
          <span className="px-3 text-sm">
            Page {page} of {totalPages}
          </span>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={() => {
              if (page < totalPages) setPage(page + 1);
            }}
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
    </>
    )}
    </>
  );
}
