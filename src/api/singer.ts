import axios from "axios";
import {SERVER} from "@/common/config";

export function getSingerList(){
    return axios.get(`${SERVER}/top/artists`)
}
