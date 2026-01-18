import { CrudModules } from "../core/constant";
import _http from "../core/http";
import { Builder, QueryParams } from "../core/queryBuilder";


export default class CrudService {
    items<T>(module : CrudModules, queryParams?: QueryParams ){
        const query = Builder(queryParams || {});
        return _http.get<T>(`${module}${query}`);
    }

    submit<T>(module : CrudModules, payload : any){
        return _http.post<T>(`${module}`,payload);
    }

    update<T>(module : CrudModules, id : number, payload : any){
        return _http.patch<T>(`${module}/${id}`,payload);
    }

    delete<T>(module : CrudModules, id : number){
        return _http.delete<T>(`${module}/${id}`);
    }

}