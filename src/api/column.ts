import axios from "axios";
import {SERVER} from "@/common/config";

export function getPlaylist(id: any){
    return axios.get(`${SERVER}/playlist/detail?id=${id}`)
}
