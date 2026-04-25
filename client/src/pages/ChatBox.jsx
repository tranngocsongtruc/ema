import React, { useEffect, useRef, useState } from "react"
import { ImageIcon, SendHorizonal } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useAuth } from "@clerk/react"
import api from "../api/axios"
import { addMessages, fetchMessages, resetMessages } from "../features/messages/messagesSlice"
import toast from "react-hot-toast"

const ChatBox = () => {
    const { messages } = useSelector((state) => state.messages)
    const { userId } = useParams()
    const { getToken } = useAuth()
    const dispatch = useDispatch()

    const [text, setText] = useState('')
    const [image, setImage] = useState(null)
    const [user, setUser] = useState(null)
    const messagesEndRef = useRef(null)

    const connections = useSelector((state) => state.connections.connections)

    const fetchUserMessages = async () => {
        try {
            const token = await getToken()
            dispatch(fetchMessages({ token, userId }))
        } catch (error) {
            toast.error(error.message)
        }
    }

    const sendMessage = async () => {
        try {
            if (!text && !image) return

            const token = await getToken()
            const formData = new FormData()
            formData.append('to_user_id', userId)
            formData.append('text', text)
            image && formData.append('image', image)

            const { data } = await api.post('/api/message/send', formData, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (data.success) {
                setText('')
                setImage(null)
                dispatch(addMessages(data.message))
            } else {
                throw new Error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchUserMessages()

        return () => {
            dispatch(resetMessages())
        }
    }, [userId])

    useEffect(() => {
        if (connections.length > 0) {
            const selectedUser = connections.find((connection) => connection._id === userId)
            setUser(selectedUser)
        }
    }, [connections, userId])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return user && (
        <div className="flex flex-col h-screen app-shell">
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 bg-[var(--surface)] border-b border-[var(--border)]">
                <img
                    src={user.profile_picture}
                    alt="the profile picture of the user you are chatting with"
                    className="w-10 h-10 rounded-full object-cover"
                />

                <div>
                    <p className="font-medium text-[var(--text)]">{user.full_name}</p>
                    <p className="text-sm text-[var(--muted)]">@{user.username}</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-scroll px-4 py-5">
                <div className="space-y-4 max-w-3xl mx-auto">
                    {messages
                        .toSorted((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                        .map((message, index) => {
                            const isIncoming = message.to_user_id !== user._id

                            return (
                                <div
                                    key={index}
                                    className={`flex ${isIncoming ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div
                                        className={`max-w-sm text-sm rounded-lg px-3 py-2 shadow-sm border ${
                                            isIncoming
                                                ? 'bg-[var(--surface)] text-[var(--text)] border-[var(--border)]'
                                                : 'bg-[var(--brand-soft)] text-[var(--text)] border-[#cddcc7]'
                                        }`}
                                    >
                                        {message.message_type === 'image' && (
                                            <img
                                                src={message.media_url}
                                                className="w-full max-w-sm rounded-lg mb-2"
                                                alt="the image attached to the message"
                                            />
                                        )}
                                        <p>{message.text}</p>
                                    </div>
                                </div>
                            )
                        })}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Composer */}
            <div className="px-4 pb-5">
                <div className="flex items-center gap-3 pl-4 pr-2 py-2 bg-[var(--surface)] w-full max-w-2xl mx-auto border border-[var(--border)] shadow-sm rounded-full">
                    <input
                        type="text"
                        className="flex-1 bg-transparent outline-none text-[var(--text)] placeholder:text-[var(--muted-soft)]"
                        placeholder="Type a message..."
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                    />

                    <label htmlFor="image" className="cursor-pointer">
                        {image ? (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="the image attached to the message"
                                className="h-8 w-8 rounded-md object-cover"
                            />
                        ) : (
                            <ImageIcon className="size-6 text-[var(--muted)]" />
                        )}
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            hidden
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </label>

                    <button
                        onClick={sendMessage}
                        className="primary-btn active:scale-[0.98] transition text-white p-2 rounded-full"
                    >
                        <SendHorizonal size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatBox