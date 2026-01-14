
import CrudService from "@/services/crud.service";
import { CrudModules } from "@/lib/endpoints";

const crudService = new CrudService();

export default class MasterService {
  static getByModule(moduleId: number) {
    return crudService.items<any[]>(CrudModules.GenericMaster, {
      filters: [
        { field: "module_id", operator: "eq", value: moduleId },
        { field: "status", operator: "eq", value: 1 },
      ],
    });
  }
}

