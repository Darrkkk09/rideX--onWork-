import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { UserDataContext } from '../context/UserContext'

const CaptainDetails = (props) => {
  const { captain } = useContext(CaptainDataContext)
  const { user } = useContext(UserDataContext)

  console.log("cap and user", captain, user)

  if (!captain || !captain.fullname) return null

  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            className="h-14 w-14 rounded-full object-cover border border-gray-300"
            src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
            alt="Captain"
          />
          <div>
            <h4 className="text-xl font-semibold capitalize">
              {captain.fullname.firstname} {captain.fullname.lastname}
            </h4>
            <p className="text-sm text-gray-600">
              {captain.vehicle.vehicleType} • {captain.vehicle.plate} • {captain.vehicle.color}
            </p>
          </div>
        </div>
        <div className="text-right">
          <h4 className="text-xl font-bold">₹295.20</h4>
          <p className="text-sm text-gray-500">Total Earnings</p>
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-center">
        <button 
        onClick={(e)=>{
            props.setShowAllRide(true)
        }}
        className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-900 transition-all">
          Search Online Rides
        </button>
      </div>
    </div>
  )
}

export default CaptainDetails
