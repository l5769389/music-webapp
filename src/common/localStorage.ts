/**
 * 获取全局数据
 */
const GLOBAL_DATA ='song';
export function getGlobalData(){
    const globalData = localStorage.getItem(GLOBAL_DATA);
    if(globalData){
        return JSON.parse(globalData);
    }else{
        return {};
    }
}

export function setGlobalData(key: any,value: any){
    const currentGlobalData = getGlobalData();
    if(currentGlobalData[key] && typeof currentGlobalData[key] == "object"){
        if(typeof value == "object"){
            currentGlobalData[key] = Object.assign(currentGlobalData[key],value)
        }else{
            currentGlobalData[key] = value
        }
    }else{
        currentGlobalData[key] = value
    }
    localStorage.setItem(GLOBAL_DATA,JSON.stringify(currentGlobalData))
}

/**
 * 删除全局数据
 */
export function removeGlobalData(key: any){
    const currentGlobalData = getGlobalData();
    if(currentGlobalData[key]){
        delete currentGlobalData[key];
        localStorage.setItem(GLOBAL_DATA,JSON.stringify(currentGlobalData));
    }
}

