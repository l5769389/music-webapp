import axios from "axios";
import {SERVER} from "@/common/config";

export function getBanner(){
    return axios.get(`${SERVER}/banner?type=2`)
}
export function getRecommendList(){
    return axios.get(`${SERVER}/personalized`)
}