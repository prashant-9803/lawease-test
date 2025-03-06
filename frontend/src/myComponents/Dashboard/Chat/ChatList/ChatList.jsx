import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const ChatList = () => {

    const {contactsPage} = useSelector((state) => state.chat)

    const [pageType, setPageType] = useState("default")

    useEffect(() => {
        setPageType(contactsPage ? "all-contacts" : "default")
    }, [contactsPage])

    


  return (
    <div>
        

    </div>
  )
}

export default ChatList