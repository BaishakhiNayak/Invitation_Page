import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";


import MasterService from "@/services/master.service";

import { MdClose } from "react-icons/md";
import { toast } from 'react-toastify';


import CrudService from "@/services/crud.service";
import { CrudModules } from "@/lib/endpoints";

import { GenericMasterModules } from "@/lib/endpoints";



import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import * as yup from "yup";

const crudService = new CrudService();

export const invitationSchema = yup.object({
  name: yup.string().required("Name required"),
  mobile_no: yup.string().required("Mobile required"),
  email: yup.string().email(),
  visitor_type: yup.string().required("This field is required"),
  purpose_id: yup.string().required("This field is required"),
  invite_date: yup.string().required("This field is required"),
  location_id: yup.string().required("This field is required"),
  comment: yup.string(),
});

const Form = ({ onCancel, onSuccess, editData }: any) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(invitationSchema),
  });

  const [visitorTypes, setVisitorTypes] = useState<any[]>([]);
  const [purposes, setPurposes] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formData, setformData] = useState<any>(null);


  const loadMasters = async () => {
    try {
      const vtRes = await MasterService.getByModule(GenericMasterModules.VisitorType); 
      const pRes  = await MasterService.getByModule(GenericMasterModules.Purpose); 
      const lRes  = await MasterService.getByModule(GenericMasterModules.Location); 

      setVisitorTypes(vtRes.data);
      setPurposes(pRes.data);
      setLocations(lRes.data);
    } catch (err) {
      console.error("Failed to load masters", err);
    }
  };

  
  useEffect(() => {
    loadMasters();
  }, [])

  const getMinDateTime = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
};

useEffect(() => {
  if (editData) {
    reset({
      name: editData.visitor_name,
      mobile_no: editData.visitor_mobile,
      email: editData.visitor_email || "",
      visitor_type: String(editData.visitor_type),
      purpose_id: String(editData.purpose_id),
      location_id: String(editData.location_id),
      invite_date: editData.invite_date.slice(0, 16),
      comment: editData.comment || "",
    });
  }
  console.log("editData in useEffect : ", editData);
}, [editData, visitorTypes, purposes, locations, reset]);


  return (
    <>
    <form
    onSubmit={handleSubmit((data) => {
    setformData(data);  
    setConfirmOpen(true);
    })}
    className="relative border p-6 rounded-md"
    >

    <h1 className="text-2xl font-semibold mb-4">Manage Invitation</h1>
    <button
    type="button"
    onClick={onCancel}
    className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
    >
    <MdClose size={22} />
    </button>

  {/* Row 1: Name + Mobile */}
  <div className="grid grid-cols-2 gap-4 mb-3">

    <div>
      <label className="block text-sm font-medium mb-1">Mobile No *</label>
      <input
        {...register("mobile_no")}
        className="w-full border rounded-md p-2"
      />
      <p className="text-red-500 text-sm">{errors.mobile_no?.message}</p>
    </div>

    <div>
      <label className="block text-sm font-medium mb-1">Name *</label>
      <input
        {...register("name")}
        className="w-full border rounded-md p-2"
      />
      <p className="text-red-500 text-sm">{errors.name?.message}</p>
    </div> 
  </div>

  {/* Row 2: Email */}
  <div>
    <label className="block text-sm font-medium mb-1">Email</label>
    <input
      {...register("email")}
      className="w-full border rounded-md p-2"
    />
  </div>

  {/* Row 3: Visitor Type + Purpose */}
  <div className="grid grid-cols-2 gap-4 my-3">
    <div>
      <label className="block text-sm font-medium mb-1">
        Visitor Type *
      </label>
      <select
  {...register("visitor_type")}
  className="w-full border rounded-md p-2"
>
  <option value=""></option>
  {visitorTypes.map((v) => (
    <option key={v.master_id} value={String(v.master_id)}>
      {v.name}
    </option>
  ))} 
</select>

      <p className="text-red-500 text-sm">
        {errors.visitor_type?.message}
      </p>
    </div>

    <div>
      <label className="block text-sm font-medium mb-1">Purpose *</label>
      <select
  {...register("purpose_id")}
  className="w-full border rounded-md p-2"
>
  <option value=""></option>
  {purposes.map((p) => (
    <option key={p.master_id} value={String(p.master_id)}>
      {p.name}
    </option>
  ))}
</select>

      <p className="text-red-500 text-sm">
        {errors.purpose_id?.message}
      </p>
    </div>
  </div>
  {/* Row 4: Date & Time + Location */}
  <div className="grid grid-cols-2 gap-4 mb-3">
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">Date & Time *</label>
      <input
        type="datetime-local"
        min={getMinDateTime()}
        {...register("invite_date")}
        className="border rounded-md px-3 py-2"
      />
      <p className="text-red-500 text-sm">
        {errors.invite_date?.message}
      </p>
    </div>

     <div>
      <label className="block text-sm font-medium mb-1">
        Location *
      </label>
      <select
        {...register("location_id")}
        className="w-full border rounded-md p-2"
      >
        <option value=""></option>
        {locations.map((l) => (
          <option key={l.master_id} value={String(l.master_id)}>
            {l.name}
          </option>
        ))}
      </select>
      <p className="text-red-500 text-sm">
        {errors.location_id?.message}
      </p>
    </div>
  </div>

  {/* Row 5: Comment */}
  <div>
    <label className="block text-sm font-medium mb-1">Comment</label>
    <textarea
      {...register("comment")}
      rows={3}
      className="w-full border rounded-md p-2"
    />
  </div>

  {/* Row 6: Buttons */}
  <div className="flex justify-end gap-3 pt-2">
    <button
      type="button"
      onClick={onCancel}
      className="px-4 py-2 border rounded-md"
    >
      Cancel
    </button>

    <button
      type="submit"
      className="px-4 py-2 bg-blue-600 text-white rounded-md"
    >
      Submit
    </button>
  </div>
</form>

  <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
  <AlertDialogContent>
    <AlertDialogHeader >
      <AlertDialogTitle >
        Confirm ?
      </AlertDialogTitle>
    </AlertDialogHeader>
        Do you want to save this invitation?
    <AlertDialogFooter>
      <AlertDialogCancel>No</AlertDialogCancel>
      <AlertDialogAction
        onClick={async () => {
        if (!formData) return;

      console.log("formData", formData);

        const payload = {
          visitor_info: {
            mobile_no: formData.mobile_no,
            name: formData.name,
            email: formData.email || "",
          },
          visitor_type: Number(formData.visitor_type),
          purpose_id: Number(formData.purpose_id),
          location_id: Number(formData.location_id),
          invite_date: formData.invite_date,
          other_info: {
            comment: formData.comment || null,
          },
        };

        
        console.log("PAYLOAD : ", payload);

        try{let res;

        if (editData) {
          res = await crudService.update(CrudModules.Invitation, editData.invite_id, payload);
          toast.success("Invitation updated successfully!");
        } else {
          res = await crudService.submit(CrudModules.Invitation, payload);
          toast.success("Invitation created successfully!");
        }

        onSuccess(res.data);
        setConfirmOpen(false);
        } catch (error) {
          toast.error("An error occurred. Please try again.");
        }
        }}
      >
      Yes
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
</>
  )
};
export default Form;

