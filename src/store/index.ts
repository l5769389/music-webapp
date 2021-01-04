import { createStore } from 'vuex'


export default createStore({
  state: {
    playBarShowFlag:false,
    playPageShowFlag:false,
    readyPlayList:[],
    playSongFlag:false,
    nowPlayingIndex:0,//表示当前正显示的是readyPlayList中的第几项，是否正常播放还要配合 playSongFlag
    nowPlayingSongID:-1,
    songtime:{
      start:0,
      end:0,
    },
    singerInfoUserChoosed:{
      name:'',
      picUrl:'',
      briefDesc:''
    },
    recentPlayList: [],
    favoriteList:[],
  },
  mutations: {
    setPlayBarShowFlag(state,payload){
      state.playBarShowFlag =payload;
    },
    setPlayPageShowFlag(state,payload){
      state.playPageShowFlag =payload;
    },
    setReadyPlayList(state,payload){
      state.readyPlayList =payload;
    },
    deleteReadyPlayListByIndex(state,payload){
      state.readyPlayList.splice(payload,1);
    },
    deleteReadyPlayListAll(state){
      state.readyPlayList.splice(1,state.readyPlayList.length-1);
    },
    setPlaySongFlag(state,payload){
      state.playSongFlag =payload;
    },
    setNowPlayingIndex(state,payload){
      state.nowPlayingIndex =payload;
    },
    setSongtime(state,payload){
      state.songtime =payload;
    },
    setNowPlayingSongID(state,payload){
      state.nowPlayingSongID = payload;
    },
    //添加收藏
    addFavoriteList(state,payload){
      const list: any = state.favoriteList;
      list.unshift(payload);
    },
    setFavoriteList(state,payload){
      state.favoriteList = payload;
    },
    // 移出收藏
    removeFavoriteList(state,payload){
      const list: any = state.favoriteList;
      const index =list.findIndex((item: any)=>{
        return  item.id === payload;
      })
      list.splice(index,1);
    },
    setRecentPlayList(state,payload){
     const list: any = state.recentPlayList;
     const index =list.findIndex((item: any)=>{
      return  item.id === payload.id;
     })
      if (index===-1){
        if (list.length>10){
          list.pop();
        }
        list.unshift(payload);
      }else {
        list.splice(index,1);
        list.unshift(payload);
      }
    },
    initRecentPlayList(state,payload){
      state.recentPlayList =payload;
    }
  },
  getters:{
    getPlayBarShowFlag:(state)=>{
      return state.playBarShowFlag;
    },
    getPlayPageShowFlag:(state)=>{
      return state.playPageShowFlag;
    },
    getReadyPlayList:(state)=>{
      return state.readyPlayList
    },
    getPlaySongFlag:(state)=>{
      return state.playSongFlag
    },
    getNowPlayingIndex:state => {
      return state.nowPlayingIndex
    },
    getSongtime:state => {
      return state.songtime
    },
    getNowPlayingSongID:state => {
      const obj: any=state.readyPlayList[state.nowPlayingIndex]
      if (obj){
         return obj.id;
      }else {
        return -1
      }
    },
    getFavoriteList:state => {
      return state.favoriteList;
    },
    getRecentPlayList:state => {
      return state.recentPlayList;
    }
  },
  actions: {
  },
  modules: {
  }
})
