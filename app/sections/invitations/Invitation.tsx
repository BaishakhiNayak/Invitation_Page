"use client";

import { useEffect, useState } from "react";
import { getInvitations } from "@/services/invitation.service";
import { cancelInvitation } from "@/services/invitation.service";


import Header from "../Header";
import Table from "../Table";
import Form from "../Form";

export default function Invitation() {
  const [tableData, setTableData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

const fetchData = async () => {
      const res = await getInvitations();
      setTableData(res.data);
    };
  useEffect(() => { 
    fetchData();
  }, []);

  

  return (
    <>
     <Header onNewClick={() => setOpen(true)} /> {/* FORM — ONLY WHEN open === true */} 
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
        </div> )} 
     <Table 
      data={tableData}
      onEdit={(row) => {
          setEditData(row);
          setOpen(true);
        }}
        onCancel={async (row) => {
      await cancelInvitation(row.invite_id);

      setTableData((prev) =>
        prev.map((r) =>
          r.invite_id === row.invite_id
            ? { ...r, status_name: "Cancelled" }
            : r
        )
    );
  }} />
    </>
  );
}
