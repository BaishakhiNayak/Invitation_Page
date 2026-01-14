import api from "@/lib/api";
import {CrudModules} from "@/lib/endpoints"
import {Builder} from "@/lib/queryBuilder";
import { QueryParams } from "@/lib/queryBuilder";

export default class CrudService {
    items<T>(module : CrudModules, queryParams?: QueryParams ){
        const query = Builder(queryParams || {});
        return api.get<T>(`${module}${query}`);
    }

    submit<T>(module : CrudModules, payload : any){
        return api.post<T>(`${module}`,payload);
    }

    update<T>(module : CrudModules, id : number, payload : any){
        return api.patch<T>(`${module}/${id}`,payload);
    }

    delete<T>(module : CrudModules, id : number){
        return api.delete<T>(`${module}/${id}`);
    }

}