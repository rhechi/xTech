export const SideItem = ({user}) => {
    return (
        
        <div className="chatlist__item">
        <div className="avatar">
        <div className="avatar-img">
        <img src={user.profilePicture} alt="" />
        
        </div>

       </div>
       <span>Name Here</span>
       <button className="btn" onClick={()=>{console.log("clicked")}}>
  <i className="fa fa-plus"></i>
</button>
 
           </div>
    )
}
