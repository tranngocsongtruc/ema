import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import MenuItems from './MenuItems'
import { CirclePlus, LogOut } from 'lucide-react'
import { UserButton, useClerk } from '@clerk/react'
import { useSelector } from 'react-redux'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.value)
    const { signOut } = useClerk()

    return (
        <div
            className={`w-56 xl:w-64 bg-[#faf7f1] border-r border-[var(--border)] flex flex-col justify-between items-center max-sm:absolute top-0 bottom-0 z-20 ${
                sidebarOpen ? 'translate-x-0' : 'max-sm:-translate-x-full'
            } transition-all duration-300 ease-in-out`}
        >
            <div className='w-full'>
                <div className="w-full h-24 px-4 flex items-center border-b border-[var(--border)] overflow-hidden">
                    <img
                        onClick={() => navigate('/')}
                        src={assets.logo}
                        className="w-36 object-contain cursor-pointer"
                        alt="EMA logo and when you click on this, it will take you back to homepage"
                    />
                </div>

                <hr className='border-[var(--border)] mb-4' />

                <MenuItems setSidebarOpen={setSidebarOpen} />

                <Link
                    to='/create-post'
                    // className='primary-btn flex items-center justify-center gap-2 py-2.5 mt-6 mx-6 rounded-lg hover:opacity-95 active:scale-95 transition text-white'
                    className='primary-btn flex items-center justify-center gap-2 py-2.5 mt-5 mx-5 rounded-lg hover:opacity-95 active:scale-95 transition text-white'
                >
                    <CirclePlus className='w-4 h-4' />
                    Create Post
                </Link>
            </div>

            <div className='w-full border-t border-[var(--border)] p-4 px-7 flex items-center justify-between bg-[#f7f2eb]'>
                <div className='flex gap-2 items-center cursor-pointer'>
                    <UserButton />
                    <div>
                        <h1 className='text-sm font-medium text-[var(--text)]'>{user.full_name}</h1>
                        <p className='text-xs text-[var(--muted)]'>@{user.username}</p>
                    </div>
                </div>

                <LogOut
                    onClick={signOut}
                    className='w-[18px] text-[var(--muted)] hover:text-[var(--text)] transition cursor-pointer'
                />
            </div>
        </div>
    )
}

export default Sidebar