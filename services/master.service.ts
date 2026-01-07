import api from "@/lib/api";

export const getVisitorTypes = async () => {
  const res = await api.get("/generic-masters?filter[0]=module_id||$eq||3&filter[1]=status||$eq||1");
  return res.data;
};

export const getPurposes = async () => {
  const res = await api.get("/generic-masters?filter[0]=module_id||$eq||4&filter[1]=status||$eq||1");
  return res.data;
};

export const getLocations = async () => {
  const res = await api.get("/generic-masters?filter[0]=module_id||$eq||5&filter[1]=status||$eq||1");
  return res.data;
};
