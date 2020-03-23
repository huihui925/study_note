/**
 * 这是一个promise的setTimeout延时器
 * @param {number} time 设定延时时间
 */
export const timeout = (time=500) => {
  return new Promise(resolve=>{
    setTimeout(() => {
      resolve()
    }, time);
  })
}