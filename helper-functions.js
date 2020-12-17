export const createFiveRandomNumbers = (len) => {
  let nums = []
  
  while(nums.length !== 5){
    let rand = Math.floor(Math.random()*len)
    if(!nums.includes(rand)) {
        nums.push(rand)
    }
  }
    
    return nums
}

