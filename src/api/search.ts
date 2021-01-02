import axios from "axios";
import {SERVER} from "@/common/config";

export function getHotSearchList(){
    return axios.get(`${SERVER}/search/hot`)
}

export function getSearchAns(keyword: any){
    return axios.get(`${SERVER}/search?keywords=${keyword}&type=1018`)
}

// 输入时，搜索建议
export function getSearchSuggest(keyword: any){
    return axios.get(`${SERVER}/search/suggest?keywords=${keyword}&type=mobile`)
}
