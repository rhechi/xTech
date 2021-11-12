export const compareConv = (a,b) =>{
    if ( a.lastMessage.createdAt < b.lastMessage.createdAt ){
        return 1;
      }
      if ( a.lastMessage.createdAt > b.lastMessage.createdAt ){
        return -1;
      }
      return 0;
}
export const  capitalize =(string) =>{
  return string.charAt(0).toUpperCase() + string.slice(1);
}