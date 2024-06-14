import axios from 'axios'


// 根据机号（SN码）查询车辆信息
export const getProductSpec = async (sn:string)=>{
  return (await axios.get(`/awp/h5/machine/code?machineCode=${sn}`)).data.data
}

// 根据机号或型号，查询车辆列表
export const getProductList = async (queryParam:string)=>{
  return (await axios.get(`/awp/h5/machine?queryParam=${queryParam}`)).data.data
}

// 根据型号，查询车辆信息
export const getProductByType = async (machineType:string)=>{
  return (await axios.get(`/awp/h5/machine/type?machineType=${machineType}`)).data.data
}

// 根据型号，查询车辆信息
export const getOtherProductListByType = async (machineType:string)=>{
  return (await axios.get(`/awp/h5/machine/other?machineType=${machineType}`)).data.data
}

// 根据型号，查询车辆信息
export const mapSearch = async (data:any)=>{
  return (await axios.post(`/awp/h5/map/search`,data)).data.data
}

// 根据型号，查询车辆信息
export const subBatch = async (data:any)=>{
  return (await axios.post(`/awp/h5/sub/batch`,data)).data.data
}

// 根据型号，查询车辆信息
export const reverseGeo = async (data:any)=>{
  return (await axios.get(`/machineapi/api/machine/monitor/location?`,data)).data.data
}
