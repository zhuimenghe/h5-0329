import { Module } from "vuex";
import {deviceInfo,workApply,repairApply} from '@/apis/rental'

interface StoreShare {
  device:ShareMachine
  schema:string
  licenseId:string
}

const store: Module<StoreShare, unknown> = {
    namespaced: true,
    state() {
      return {
        device:{},
        schema:'',
        licenseId:''
      }
    },
    mutations: {
        setState(state: StoreShare, payload: StoreShare) {
          Object.assign(state,payload)
        }
    },
    actions:{
      async init(context, {licenseId,schema}) {
        let device = await deviceInfo(licenseId,schema)
        setDocumentTitle(device.organizationName||'设备详情')
        context.commit("setState", {licenseId,schema,device});
      },
      async applyRepair(context, p:RepairApplyReq) {
        await repairApply(p,context.state.schema)
      },
      async applyWork(context, p:WorkApplyReq) {
        await workApply(p,context.state.schema)
      }
    }
}

export default store