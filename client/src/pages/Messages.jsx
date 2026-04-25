import React from "react"
import { Eye, MessageSquare } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const Messages = () => {
    const { connections } = useSelector((state) => state.connections)
    const navigate = useNavigate()

    return (
        <div className="min-h-screen app-shell">
            <div className="max-w-5xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-[var(--text)] mb-2">Messages</h1>
                    <p className="text-[var(--muted)]">Talk to the people you have already connected with.</p>
                </div>

                {/* <div className="space-y-4">
                    {connections.map((user) => (
                        <div
                            key={user._id}
                            className="surface-card max-w-2xl mx-auto flex gap-4 p-5 rounded-xl hover:bg-[#fbf7ef] transition"
                        >
                            <img
                                src={user.profile_picture}
                                alt="the profile picture of the user who you are chatting with"
                                className="rounded-full w-12 h-12 object-cover shrink-0"
                            />

                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-[var(--text)]">{user.full_name}</p>
                                <p className="text-[var(--muted)] text-sm">@{user.username}</p>
                                <p className="text-sm text-[var(--muted)] mt-1 line-clamp-2">{user.bio}</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => navigate(`/messages/${user._id}`)}
                                    className="secondary-btn size-10 flex items-center justify-center rounded-lg active:scale-[0.98] transition"
                                >
                                    <MessageSquare className="w-4 h-4" />
                                </button>

                                <button
                                    onClick={() => navigate(`/profile/${user._id}`)}
                                    className="secondary-btn size-10 flex items-center justify-center rounded-lg active:scale-[0.98] transition"
                                >
                                    <Eye className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div> */}
                {connections.length === 0 ? (
                    <div className="ui-empty max-w-2xl mx-auto">
                        <p className="font-medium text-[var(--text)]">No conversations yet</p>
                        <p className="text-sm mt-1">Connect with someone first, then start a message.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {connections.map((user) => (
                            <div
                                key={user._id}
                                className="surface-card max-w-2xl mx-auto flex gap-4 p-5 rounded-xl hover:bg-[#fbf7ef] transition"
                            >
                                <img
                                    src={user.profile_picture}
                                    alt="the profile picture of the user who you are chatting with"
                                    className="rounded-full w-12 h-12 object-cover shrink-0"
                                />

                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-[var(--text)]">{user.full_name}</p>
                                    <p className="text-[var(--muted)] text-sm">@{user.username}</p>
                                    <p className="text-sm text-[var(--muted)] mt-1 line-clamp-2">{user.bio}</p>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => navigate(`/messages/${user._id}`)}
                                        className="secondary-btn size-10 flex items-center justify-center rounded-lg active:scale-[0.98] transition"
                                    >
                                        <MessageSquare className="w-4 h-4" />
                                    </button>

                                    <button
                                        onClick={() => navigate(`/profile/${user._id}`)}
                                        className="secondary-btn size-10 flex items-center justify-center rounded-lg active:scale-[0.98] transition"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Messages