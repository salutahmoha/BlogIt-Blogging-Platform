import React from 'react'
import UpdatePersonaInformation from '../../components/Previews/UpdatePersonaInformation'
import Navbar from '../BlogNavbar/navbar'
import UpdatePassword from '../../components/Previews/UpdatePassword'
function Profile() {
  return (
    <div>
        <Navbar />
        <div className='profile'>
        <UpdatePersonaInformation />
        <UpdatePassword />
        </div>
    </div>
  )
}

export default Profile