import axios from 'axios'


let config = { headers: { "Content-Type": "multipart/form-data" } }

// 上传
export const fileUpload = async (formObj:any)=>{
    return (await axios.post(`/awp/h5/upload`,formObj,config)).data.data
}
