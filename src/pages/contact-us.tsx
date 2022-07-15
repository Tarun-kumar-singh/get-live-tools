import type { NextPage } from 'next'
import { useEffect } from 'react'

const ContactUs: NextPage = () => {
  
  useEffect(() =>{
    console.log('render contact us...')
  }, [])

  return (
    <div>
      This is from ContactUs...
    </div>
  )
}

export default ContactUs
