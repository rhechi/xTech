export const compareConv = (a,b) =>{
    if ( a.lastMessage.createdAt < b.lastMessage.createdAt ){
        return -1;
      }
      if ( a.lastMessage.createdAt > b.lastMessage.createdAt ){
        return 1;
      }
      return 0;
}