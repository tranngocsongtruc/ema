import React, { useEffect, useState } from "react"
import { Users, UserPlus, UserCheck, UserRoundPen, MessageSquare } from 'lucide-react'
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useAuth } from "@clerk/react"
import { fetchConnections } from "../features/connections/connectionsSlice"
import toast from "react-hot-toast"
import api from "../api/axios"

const Connections = () => {
    const [currentTab, setCurrentTab] = useState('Followers')

    const navigate = useNavigate()
    const { getToken } = useAuth()
    const dispatch = useDispatch()

    const { connections, pendingConnections, followers, following } = useSelector((state) => state.connections)

    const dataArray = [
        { label: 'Followers', value: followers, icon: Users },
        { label: 'Following', value: following, icon: UserCheck },
        { label: 'Pending', value: pendingConnections, icon: UserRoundPen },
        { label: 'Connections', value: connections, icon: UserPlus },
    ]

    const handleUnfollow = async (userId) => {
        try {
            const { data } = await api.post('/api/user/unfollow', { id: userId }, {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })

            if (data.success) {
                toast.success(data.message)
                dispatch(fetchConnections(await getToken()))
            } else {
                toast(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const acceptConnection = async (userId) => {
        try {
            const { data } = await api.post('/api/user/accept', { id: userId }, {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })

            if (data.success) {
                toast.success(data.message)
                dispatch(fetchConnections(await getToken()))
            } else {
                toast(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getToken().then((token) => {
            dispatch(fetchConnections(token))
        })
    }, [])

    return (
        <div className="min-h-screen app-shell">
            <div className="max-w-6xl mx-auto p-6">
                {/* Title */}
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-[var(--text)] mb-2">Connections</h1>
                    <p className="text-[var(--muted)]">Manage your network and stay organized.</p>
                </div>

                {/* Counts */}
                <div className="mb-8 flex flex-wrap gap-6">
                    {dataArray.map((item, index) => (
                        <div
                            key={index}
                            className="surface-card rounded-lg flex flex-col items-center justify-center gap-1 h-20 w-40"
                        >
                            <b className="text-[var(--text)]">{item.value.length}</b>
                            <p className="text-[var(--muted)]">{item.label}</p>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="inline-flex flex-wrap items-center border border-[var(--border)] rounded-lg p-1 bg-[var(--surface)] shadow-sm">
                    {dataArray.map((tab) => (
                        <button
                            onClick={() => setCurrentTab(tab.label)}
                            key={tab.label}
                            className={`cursor-pointer flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                                currentTab === tab.label
                                    ? 'bg-[var(--brand-soft)] font-medium text-[var(--brand-dark)]'
                                    : 'text-[var(--muted)] hover:text-[var(--text)]'
                            }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            <span className="ml-1">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Connections */}
                <div className="flex flex-wrap gap-6 mt-6">
                    {dataArray.find((item) => item.label === currentTab).value.map((user) => (
                        <div key={user._id} className="surface-card w-full max-w-88 flex gap-4 p-5 rounded-xl">
                            <img
                                src={user.profile_picture}
                                alt="the profile picture of the user that you connect or may connect with"
                                className="rounded-full w-12 h-12 object-cover shadow-sm shrink-0"
                            />

                            <div className="flex-1">
                                <p className="font-medium text-[var(--text)]">{user.full_name}</p>
                                <p className="text-[var(--muted)] text-sm">@{user.username}</p>
                                <p className="text-sm text-[var(--muted)] mt-1">
                                    {user.bio.slice(0, 30)}...
                                </p>

                                <div className="flex max-sm:flex-col gap-2 mt-4">
                                    <button
                                        onClick={() => navigate(`/profile/${user._id}`)}
                                        className="primary-btn w-full p-2 text-sm rounded-lg active:scale-[0.98] transition text-white"
                                    >
                                        View Profile
                                    </button>

                                    {currentTab === 'Following' && (
                                        <button
                                            onClick={() => handleUnfollow(user._id)}
                                            className="secondary-btn w-full p-2 text-sm rounded-lg active:scale-[0.98] transition"
                                        >
                                            Unfollow
                                        </button>
                                    )}

                                    {currentTab === 'Pending' && (
                                        <button
                                            onClick={() => acceptConnection(user._id)}
                                            className="secondary-btn w-full p-2 text-sm rounded-lg active:scale-[0.98] transition"
                                        >
                                            Accept
                                        </button>
                                    )}

                                    {currentTab === 'Connections' && (
                                        <button
                                            onClick={() => navigate(`/messages/${user._id}`)}
                                            className="secondary-btn w-full p-2 text-sm rounded-lg active:scale-[0.98] transition flex items-center justify-center gap-1"
                                        >
                                            <MessageSquare className="w-4 h-4" />
                                            Message
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Connections