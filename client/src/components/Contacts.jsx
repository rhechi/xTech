import Contact from './Contact'
import { getContactsCall } from '../api/contactCall'
import { useSelector , useDispatch } from 'react-redux'
import { useEffect } from 'react'


function Contacts() {
    const user = useSelector(state=>state.user.login.info)
    const dispatch = useDispatch()
    const contacts = useSelector(state=>state.contacts.current)
    const loading = useSelector(state=>state.contacts.loading)
    const error = useSelector(state=>state.contacts.error)
    useEffect(()=>{
        const getContacts = async()=>{
            await getContactsCall(user,dispatch)
        }
    },[])
    console.log(contacts)
    return (
        <div>
            { contacts == []? <span>No contacts</span> : <div>
               { contacts.map(c=>(
                   <Contact contact={c}/>
               ))}
            </div> }

        </div>
    )
}

export



default Contacts
