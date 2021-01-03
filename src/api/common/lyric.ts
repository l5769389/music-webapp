import axios from "axios";
import {SERVER} from "@/common/config";

export function getLyric(id: any){
    return axios.get(`${SERVER}/lyric?id=${id}`)
}
