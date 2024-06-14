import axios from 'axios'


// 根据code查询微信openId
export const getWeixinOpenId = async (weixinCode:string)=>{
  return (await axios.get(`/awp/h5/weixin/openId?weixinCode=${weixinCode}`)).data.data
}
