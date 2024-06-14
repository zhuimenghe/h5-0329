import { MockMethod } from 'vite-plugin-mock'
export default [
    {
        url: '/api/awp/h5/sps/',
        method: 'get',
        response: () => {
            return {
                code: 200,
                message: 'ok',
                data: {
                  id:'123',
                  machineName:'我的',//设备名
                  machineType:'SPS1212AC',//型号
                  sizeMaxPlatHeight:'12m',//最大平台高度
                  sizeMaxWorkHeight:'13m',//最大工作高度
                  sizeMaxHorizontalExt:'2m',//最大水平延展
                  sizeAllLength:'2.48m/2.27m',//整机长度（带梯子/不带梯子）
                  sizeAllWidth:'4m',//整机宽度
                  sizeAllHeight1:'12.48m/12.27m',//整机高度（收车状态、护栏折叠）
                  sizeAllHeight2:'12.48m/12.27m',//整机高度（收车状态、护栏未折叠）
                  sizeWheelbase:'2m',//轴距
                  sizeTrackWidth:'3m',//轮距
                  sizeGroundClearance1:'1m',//离地间隙（坑洞保护装置收起）
                  sizeGroundClearance2:'1m',//离地间隙（坑洞保护装置展开）
                  sizeTire:'2x3',//轮胎尺寸（直径×宽度）
                  sizePlatform:'4x3',//平台尺寸（长度×宽度）
                  pePlatCapacity:'350kg/350kg',//平台额定承载能力（室内/室外）
                  pePlatExtCapacity:'120kg/120kg',//延伸平台最大承载能力（室内/室外）
                  pePlatMaxPerson:'2人/1人',//平台最大承载人数（室内/室外）
                  pePlatExtMaxPerson:'1人/1人',//延伸平台最大承载人数（室内/室外）
                  peDrivingSpeed:'0~3.5km/h',//行驶速度（收车状态）
                  peLiftDrivingSpeed:'0~3.5km/h',//行驶速度（举升状态）
                  pePlatLiftTime:'55±5s',//平台全升时间（无载重）
                  pePlatDescentTime:'42±5s',//平台全降时间（无载重）
                  peClimbing:'25%',//爬坡能力
                  peMaxTilt:'左右1.5°/前后3°',//最大允许倾斜角
                  peTurningInner:'6m',//转弯半径（内轮）
                  peTurningOuter:'4m',//转弯半径（外轮）
                  peSingleTireCapacity:'55kg',//单个轮胎额定承载能力
                  peMaxAllowTilt:'400N/200N',//最大允许倾斜力（室内/室外）
                  poHydVolume:'60L',//液压油箱容积
                  poHydPressure:'500Pa',//液压系统压力
                  poBatterySpec:'4×6V/260AH',//电池规格（数量×电压，容量）
                  poSystemVoltage:'220V',//系统电压
                  poControlVoltage:'22V',//控制电压
                  envMaxWind:'0/12.5m/s',//最大允许风速（室内/室外）
                  envMaxAltitude:'3000m',//最大允许海拔高度
                  envTemperature1:'-10℃~40℃',//允许使用环境温度（酸铅电池）
                  envTemperature2:'-20℃~40℃',//允许使用环境温度（锂电池）
                  envStorage:'干燥',//存储环境
                  machineWeight:'3000kg',//整机重量（无载重）
                }
            }
        }
    }
] as MockMethod[]