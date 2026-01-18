import { useState } from "react";


import CrudService from "@/src/services/crud.service";
import { CrudModules } from "@/src/core/constant";
import { QueryParams } from "../core/queryBuilder";

export default function useCrud<T>(module: CrudModules) {
  const service = new CrudService();

  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);
  const [ totalPages, setTotalPages] = useState(1);

  const load = async (params?: QueryParams) => {
    try {
      setLoading(true);
      setError(false);

      const res = await service.items<{ pageCount?: number; data: any }>(module, params);
      console.log(res.data.data);
      setData(res.data);

      console.log("page count =>", res.data.pageCount);
      setTotalPages(res.data.pageCount || 1);

      
    } catch (err) {
      setError(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const create = (payload: any) => service.submit(module, payload);
  const update = (id: number, payload: any) => service.update(module, id, payload);
  
  const cancel = (id: number, cancelModule?: CrudModules) => {
  return service.delete(cancelModule ?? module, id);
  };



/*console.log(" useCrud raw data =>", data);
console.log(" type of data =>", typeof data);
console.log(" data?.data =>", data?.data);*/


  return {
    data,
    loading,
    hasError,
    load,
    create,
    update,
    cancel,
    totalPages,
  };
}
