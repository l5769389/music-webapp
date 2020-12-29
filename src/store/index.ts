import { createStore } from 'vuex'

export default createStore({
  state: {
    playBarShowFlag:false,
    playPageShowFlag:false,
    readyPlayList:[],
    favoriteList:[],
    playSongFlag:false,
    nowPlayingIndex:0,//表示当前正显示的是readyPlayList中的第几项，是否正常播放还要配合 playSongFlag
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
    setPlaySongFlag(state,payload){
      state.playSongFlag =payload;
    },
    setNowPlayingIndex(state,payload){
      state.nowPlayingIndex =payload;
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
    }
  },
  actions: {
  },
  modules: {
  }
})
