import React from 'react'
import { MapPin, MessageCircle, Plus, UserPlus } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '@clerk/react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import toast from 'react-hot-toast'
import { fetchUser } from '../features/user/userSlice'

const UserCard = ({ user }) => {
    const currentUser = useSelector((state) => state.user.value)
    const { getToken } = useAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleFollow = async () => {
        try {
            const { data } = await api.post('/api/user/follow', { id: user._id }, {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })

            if (data.success) {
                toast.success(data.message)
                dispatch(fetchUser(await getToken()))
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleConnectionRequest = async () => {
        if (currentUser.connections.includes(user._id)) {
            return navigate('/messages/' + user._id)
        }

        try {
            const { data } = await api.post('/api/user/connect', { id: user._id }, {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })
            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div key={user._id} className='surface-card rounded-xl p-5 pt-6 flex flex-col justify-between w-72'>
            <div className='text-center'>
                <img
                    src={user.profile_picture}
                    alt="the profile picture of the people who you may want to connect with"
                    className='rounded-full w-16 h-16 object-cover shadow-sm mx-auto'
                />
                <p className='mt-4 font-semibold text-[var(--text)]'>{user.full_name}</p>
                {user.username && <p className='text-[var(--muted)] text-sm'>@{user.username}</p>}
                {user.bio && <p className='text-[var(--muted)] mt-2 text-center text-sm px-2 leading-relaxed'>{user.bio}</p>}
            </div>

            <div className='flex items-center justify-center gap-2 mt-4 text-xs text-[var(--muted)] flex-wrap'>
                <div className='flex items-center gap-1 border border-[var(--border)] rounded-full px-3 py-1 bg-[var(--surface-muted)]'>
                    <MapPin className='w-4 h-4' /> {user.location}
                </div>
                <div className='flex items-center gap-1 border border-[var(--border)] rounded-full px-3 py-1 bg-[var(--surface-muted)]'>
                    <span>{user.followers.length}</span> Followers
                </div>
            </div>

            <div className='flex mt-4 gap-2'>
                {/* Follow Button */}
                <button
                    onClick={handleFollow}
                    disabled={currentUser?.following.includes(user._id)}
                    className='primary-btn w-full py-2 rounded-lg flex justify-center items-center gap-2 hover:opacity-95 active:scale-[0.98] transition text-white disabled:opacity-70'
                >
                    <UserPlus className='w-4 h-4' />
                    {currentUser?.following.includes(user._id) ? 'Following' : 'Follow'}
                </button>

                {/* Connection Request Button / Message Button */}
                <button
                    onClick={handleConnectionRequest}
                    className='secondary-btn flex items-center justify-center w-16 rounded-lg active:scale-[0.98] transition'
                >
                    {currentUser?.connections.includes(user._id) ? (
                        <MessageCircle className='w-5 h-5' />
                    ) : (
                        <Plus className='w-5 h-5' />
                    )}
                </button>
            </div>
        </div>
    )
}

export default UserCard