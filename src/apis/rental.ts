import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const rental = axios.create({
  baseURL: import.meta.env.VITE_API_DOMAIN_RENTAL,
  timeout: 6000
});

// 获取扫码设备信息
export const deviceInfo = async (licenseId:string,schema:string):Promise<ShareMachine>=>{
  return (await rental.get(`/machineapi/api/machine/monitor/MachineMonitorQRCode?licenseId=${licenseId}&schema=${schema}`)).data.result
}

// 报修申请
export const repairApply = async (data:RepairApplyReq,schema:string)=>{
  return (await rental.post(`/machineapi/api/machine/monitor/saveMachineRepairs?schema=${schema}`,data)).data.result
}

// 进退场申请
export const workApply = async (data:WorkApplyReq,schema:string)=>{
  return (await rental.post(`/machineapi/api/machine/monitor/saveConsultRecord?schema=${schema}`,data)).data.result
}