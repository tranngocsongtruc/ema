import React, { useEffect, useState } from "react"
import { assets, dummyPostsData } from "../assets/assets"
import Loading from "../components/Loading"
import StoriesBar from "../components/StoriesBar"
import PostCard from "../components/PostCard"
import RecentMessages from "../components/RecentMessages"

const Feed = () => {

        const [feeds, setfeeds] = useState([])
        const [loading, setLoading] = useState(true)

        const fetchFeeds = async () => {
            setfeeds(dummyPostsData)
            setLoading(false)
        }

        useEffect(()=>{
            fetchFeeds()
        }, [])

    return !loading ? (
        <div className="h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8">
            {/* Stories and post list */}
            <div>
                <StoriesBar />
                <div className="p-4 space-y-6">
                    {feeds.map((post)=>(
                        <PostCard key={post._id} post={post}/>
                    ))}
                </div>
            </div>

            {/* Right sidebar */}
            <div className="max-xl:hidden sticky top-0">
                <div className="max-w-xs bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow">
                    <h3 className="text-slate-800 font-semibold">Events</h3>
                    <img 
                        src={assets.event_sample_img}
                        className="w-75 h-50 rounded-md"
                        alt="the image of the sample event"/>
                    <p className="text-slate-600">Coming Events in Your Area</p>
                    <p className="text-slate-400">Create your own event page and put in the location to let your friends know</p>
                </div>
                <RecentMessages />
            </div>
        </div>
    ) : <Loading />
}

export default Feed