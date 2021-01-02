import axios from "axios";
import {SERVER} from "@/common/config";

export function getPlaylist(id: any){
    return axios.get(`${SERVER}/playlist/detail?id=${id}`)
}

//获取歌手前50的歌曲列表
export function  getSingerTopList(id: any){
    return axios.get(`${SERVER}/artist/top/song?id=${id}`)
}
// 获取歌手的描述信息
export function  getSingerDesc(id: any){
    return axios.get(`${SERVER}/artist/detail?id=${id}`)
}