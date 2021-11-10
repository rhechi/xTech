

function Contact({fistName,lastName,profilePicture,status,_id}) {

    return (
        <div >
            <img src={profilePicture} alt="" />
            <span>{`${fistName} ${lastName}`}</span>
        </div>
    )
}

export default Contact
