export { }
declare global {
  export interface BaseRespData {
    [propName: string]: any;
  }

  export interface BaseResp {
    msg: string
    code: number
    result: BaseRespData
  }

  export interface ListRespData<T> {
    code: number
    msg: string
    total: number
    result: UnwrapRefSimple<T>[]
    [propName: string]: any;
  }

  type MachineTypeId = '1' | '2' | '3' | '4';
  export interface ShareMachine{
    lowPowerDays?:'低电量天数'
    machineTypeName?:'型号'
    organizationName?:'公司名称'
    machineHeightDesc?:'高度'
    offLineDays?:'离线天数'
    closeDate?:'上一次关机日期' 
    printcode?:string
    picList?:Array<any>
    machineBrand?:'品牌'
    machineTypeDesc?:'自行剪叉车'
    closeDays?:'关机天数'
    locateDate?:'定位时间'
    contactphone?:'咨询电话'
    licenseId?:'机号'
    batteryPower?:'当前电量'
    machineTypeId?:MachineTypeId
  }

  export interface RepairApplyReq{
    "name"?:string,
    "phone"?:string,
    "machine"?:string,
    "matterDesc"?:string,
    "resource"?:string
  }
  export interface WorkApplyReq{
    "name"?:string,
    "phone"?:string,
    "machineType"?:string,//1-自行剪叉式；2-自行曲臂式；3-自行直臂式；4-其他
    "machineHeight"?:string,
    "type":string,
    "resource"?:string
  }

}