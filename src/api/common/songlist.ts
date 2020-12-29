import axios from "axios";
import {SERVER} from "@/common/config";

export function getSongSrc(id: any){
    return axios.get(`${SERVER}/song/url?id=${id}`)
}
