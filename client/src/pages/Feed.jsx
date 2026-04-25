import React, { useEffect, useState } from "react"
import { assets } from "../assets/assets"
import Loading from "../components/Loading"
import StoriesBar from "../components/StoriesBar"
import PostCard from "../components/PostCard"
import RecentMessages from "../components/RecentMessages"
import { useAuth } from "@clerk/react"
import api from "../api/axios"
import toast from "react-hot-toast"

const Feed = () => {
    const [feeds, setFeeds] = useState([])
    const [loading, setLoading] = useState(true)
    const { getToken } = useAuth()

    const fetchFeeds = async () => {
        try {
            setLoading(true)
            const { data } = await api.get('/api/post/feed', {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })

            if (data.success) {
                setFeeds(data.posts)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchFeeds()
    }, [])

    return !loading ? (
        <div className="h-full overflow-y-scroll no-scrollbar py-8 xl:pr-5 flex items-start justify-center xl:gap-8 app-shell">
            {/* Stories and post list */}
            <div>
                <div className="px-4 mb-2">
                    <h1 className="text-2xl font-semibold text-[var(--text)]">Feed</h1>
                    <p className="text-sm text-[var(--muted)]">
                        A calmer place to catch up with people you care about.
                    </p>
                </div>

                <StoriesBar />

                <div className="p-4 space-y-6">
                    {feeds.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
            </div>

            {/* Right sidebar */}
            <div className="max-xl:hidden sticky top-0">
                <div className="surface-card max-w-xs text-xs p-4 rounded-xl inline-flex flex-col gap-2">
                    <h3 className="text-[var(--text)] font-semibold">Events</h3>
                    <img
                        src={assets.event_sample_img}
                        className="w-75 h-50 rounded-lg object-cover"
                        alt="the image of the sample event"
                    />
                    <p className="text-[var(--muted)]">Coming Events in Your Area</p>
                    <p className="text-[var(--muted-soft)]">
                        Create your own event page and put in the location to let your friends know
                    </p>
                </div>

                <RecentMessages />
            </div>
        </div>
    ) : <Loading />
}

export default Feed