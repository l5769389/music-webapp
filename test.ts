function a(){
  return  new Promise((resolve, reject) =>{
       setTimeout(()=>{
           resolve(33)
       },2000)
   })
}
let ans ;
const b =async ()=>{
    ans = await a();
    console.log(ans)
}
b();
console.log(111)
