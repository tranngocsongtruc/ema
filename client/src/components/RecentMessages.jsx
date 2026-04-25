import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useAuth, useUser } from '@clerk/react'
import api from '../api/axios'
import toast from 'react-hot-toast'

const RecentMessages = () => {
    const [messages, setMessages] = useState([])
    const { user } = useUser()
    const { getToken } = useAuth()

    const fetchRecentMessages = async () => {
        try {
            const token = await getToken()

            const { data } = await api.get('/api/user/recent-messages', {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (data.success) {
                // Group messages by sender and get the latest message for each sender
                const groupedMessages = data.messages.reduce((acc, message) => {
                    const senderId = message.from_user_id._id

                    if (
                        !acc[senderId] ||
                        new Date(message.createdAt) > new Date(acc[senderId].createdAt)
                    ) {
                        acc[senderId] = message
                    }

                    return acc
                }, {})

                // Sort messages by date
                const sortedMessages = Object.values(groupedMessages).sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                )

                setMessages(sortedMessages)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (user) {
            fetchRecentMessages()
            const intervalId = setInterval(fetchRecentMessages, 30000)

            return () => {
                clearInterval(intervalId)
            }
        }
    }, [user])

    return (
        <div className='surface-card max-w-xs mt-4 p-4 min-h-20 rounded-xl text-xs text-[var(--text)]'>
            <h3 className='font-semibold text-[var(--text)] mb-4'>Recent Messages</h3>

            {messages.length === 0 ? (
                <div className='ui-empty py-5 px-4'>
                    <p className='font-medium text-[var(--text)]'>No recent messages</p>
                    <p className='text-xs mt-1'>New conversations will appear here.</p>
                </div>
            ) : (
                <div className='flex flex-col max-h-56 overflow-y-scroll no-scrollbar'>
                    {messages.map((message) => (
                        <Link
                            to={`/messages/${message.from_user_id._id}`}
                            key={message._id}
                            className='flex items-start gap-2 py-2 px-1 rounded-lg hover:bg-[#f3eee5] transition-colors'
                        >
                            <img
                                src={message.from_user_id.profile_picture}
                                alt="the profile picture of the user who you are chatting with"
                                className='w-8 h-8 rounded-full object-cover'
                            />

                            <div className='w-full min-w-0'>
                                <div className='flex justify-between gap-2'>
                                    <p className='font-medium text-[var(--text)] truncate'>{message.from_user_id.full_name}</p>
                                    <p className='text-[10px] text-[var(--muted-soft)] shrink-0'>
                                        {moment(message.createdAt).fromNow()}
                                    </p>
                                </div>

                                <div className='flex justify-between gap-2'>
                                    <p className='text-[var(--muted)] truncate'>
                                        {message.text ? message.text : 'Media'}
                                    </p>
                                    {!message.seen && (
                                        <p className='bg-[var(--brand)] text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px] shrink-0'>
                                            1
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )    
}

export default RecentMessages