import api from "@/lib/api";

export const getInvitations = async () => {
  const res = await api.get("/invitation-view?limit=10&page=1&sort[0]=invite_id,DESC&fields=invite_id,invite_code,visitor_name,visitor_mobile,visitor_email,visitor_type_name,visitor_type,purpose_name,purpose_id,invite_date,location_name,location_id,status_name,status,visit_id,comment"); 
  return res.data;
};

export const createInvitation = (data: any) => {
  return api.post("/invitation", data);
};

export const updateInvitation = (id: number, payload: any) =>
  api.patch(`/invitation/${id}`, payload);

export const cancelInvitation = (id: number) => {
  return api.delete(`/invitation/cancel/${id}`);
};

