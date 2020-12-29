import axios from "axios";
import {SERVER} from "@/common/config";

export function getRank(){
    return axios.get(`${SERVER}/toplist/detail`)
}
