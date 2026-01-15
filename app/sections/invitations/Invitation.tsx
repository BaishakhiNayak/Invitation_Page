"use client";

import { useEffect, useState } from "react";
 
import CrudService from "@/services/crud.service";
import { CrudModules } from "@/lib/endpoints";

import Header from "../Header";
import Table from "../Table";
import Form from "../Form";
import { toast } from "react-toastify";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import Loader from "@/components/ui/Loader";


const crudService = new CrudService();

export default function Invitation() {
  const [tableData, setTableData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);   
  const [totalPages, setTotalPages] = useState(1);
    
  const fetchData = async (page:number) => {
    try {
    setLoading(true); 
    const res =await crudService.items<any[]>(CrudModules.InvitationView, {
    page: page,
    limit: limit,
    sorts: [
      { field: "invite_id", order: "DESC" }
    ],
    filters: [
      { field: "status", operator: "$in", value: [1,2] }
    ]
  });
      console.log(res);
      setTableData(res.data.data);

    const totalRecords = res.data.total ??  10;
    setTotalPages(Math.ceil(totalRecords / limit));

    } catch (err) {
      toast.error("Failed to fetch invitations.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <>
      <Header onNewClick={() => setOpen(true)} />
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-start pt-10">
          <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 relative">
            <Form
              onCancel={() => {
                setOpen(false);
                setEditData(null);
              }}
              onSuccess={async () => {
                await fetchData(); 
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
      <Table
        data={tableData}
        onEdit={(row) => {
          setEditData(row);
          setOpen(true);
        }}
        onCancel={async (row) => {
          try { 
            await crudService.delete(CrudModules.InvitationCancel, row.invite_id);
            toast.success("Invitation cancelled successfully!");
            setTableData((prev) =>
              prev.map((r) =>
                r.invite_id === row.invite_id
                  ? { ...r, status_name: "Cancelled" }
                  : r
              )
            );
          } catch (err) {
            toast.error("Failed to cancel invitation.");
          }
        }}
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
