import React from 'react'
import UpdatePersonaInformation from '../../components/Previews/UpdatePersonaInformation'
import Navbar from '../BlogNavbar/navbar'
import UpdatePassword from '../../components/Previews/UpdatePassword'
import ProfileUpdate from '../../components/Previews/ProfileUpdate'
function Profile() {
  return (
    <div>
        <Navbar />
        <div className='profile'>
        <ProfileUpdate />
        <UpdatePersonaInformation />
        <UpdatePassword />
        </div>
    </div>
  )
}

export default Profile