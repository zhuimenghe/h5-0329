import axios from 'axios'


// 购买咨询，提交表单
export const buyContactFormSubmit = async (formObj:any)=>{
    return (await axios.post(`/awp/h5/contact/buy`,formObj)).data.data
}

// 租赁咨询，提交表单
export const rentalContactFormSubmit = async (formObj:any)=>{
    return (await axios.post(`/awp/h5/contact/rental`,formObj)).data.data
}

// 租赁咨询，提交表单
export const repairContactFormSubmit = async (formObj:any)=>{
    return (await axios.post(`/awp/h5/contact/repair`,formObj)).data.data
}