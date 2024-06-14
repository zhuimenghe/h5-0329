import axios from 'axios'


// 订阅或取消订阅
export const machineSubOps = async (formObj:any)=>{
  return (await axios.post(`/awp/h5/sub`,formObj)).data.data
}

// 订阅或取消订阅
export const machineSubJudge = async (openId:string,machineCode:string)=>{
  return (await axios.get(`/awp/h5/sub/judge?openId=${openId}&machineCode=${machineCode}`)).data.data
}

// 查询用户的设备订阅信息
export const findMachineSubInfoToMobile = async (openId:string,offset:number,limit:number)=>{
  return (await axios.get(`/awp/h5/sub/mobile/list?openId=${openId}&offset=${offset}&limit=${limit}`)).data.data
}
