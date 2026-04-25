import React, { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import moment from 'moment'
import StoryModal from './StoryModal'
import StoryViewer from './StoryViewer'
import { useAuth } from '@clerk/react'
import api from '../api/axios'
import toast from 'react-hot-toast'

const StoriesBar = () => {
    const { getToken } = useAuth()

    const [stories, setStories] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [viewStory, setViewStory] = useState(null)

    const fetchStories = async () => {
        try {
            const token = await getToken()
            const { data } = await api.get('/api/story/get', {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (data.success) {
                setStories(data.stories)
            } else {
                toast(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchStories()
    }, [])

    return (
        <div className='w-screen sm:w-[calc(100vw-240px)] lg:max-w-2xl no-scrollbar overflow-x-auto px-4'>
            <div className='flex gap-4 pb-5'>
                {/* Add Story Card */}
                <div
                    onClick={() => setShowModal(true)}
                    className='rounded-xl shadow-sm min-w-30 max-w-30 max-h-40 aspect-[3/4] cursor-pointer hover:shadow-md transition-all duration-200 border border-dashed border-[#b7c9b3] bg-[#f7f5ef]'
                >
                    <div className='h-full flex flex-col items-center justify-center p-4'>
                        <div className='size-10 bg-[var(--brand)] rounded-full flex items-center justify-center mb-3'>
                            <Plus className='w-5 h-5 text-white' />
                        </div>
                        <p className='text-sm font-medium text-[var(--text)] text-center'>Create Story</p>
                    </div>
                </div>

                {/* Story Cards */}
                {stories.map((story, index) => (
                    <div
                        onClick={() => setViewStory(story)}
                        key={index}
                        className='relative rounded-xl shadow-sm min-w-30 max-w-30 max-h-40 cursor-pointer hover:shadow-md transition-all duration-200 bg-gradient-to-b from-[#a8bfa5] to-[#8da48c] active:scale-95 overflow-hidden'
                    >
                        {story.media_type !== 'text' && (
                            <div className='absolute inset-0 z-1 bg-black overflow-hidden rounded-xl'>
                                {story.media_type === "image" ? (
                                    <img
                                        src={story.media_url}
                                        alt="this story is displayed as an image"
                                        className='h-full w-full object-cover hover:scale-105 transition duration-500 opacity-75 hover:opacity-85'
                                    />
                                ) : (
                                    <video
                                        src={story.media_url}
                                        className='h-full w-full object-cover hover:scale-105 transition duration-500 opacity-75 hover:opacity-85'
                                    />
                                )}
                            </div>
                        )}

                        <img
                            src={story.user.profile_picture}
                            alt="profile picture of the user who posts this story"
                            className='absolute size-8 top-3 left-3 z-10 rounded-full ring ring-white/80 shadow'
                        />

                        <p className='absolute top-18 left-3 z-10 text-white/80 text-sm truncate max-w-24'>
                            {story.content}
                        </p>

                        <p className='text-white absolute bottom-1 right-2 z-10 text-xs'>
                            {moment(story.createdAt).fromNow()}
                        </p>
                    </div>
                ))}
            </div>

            {/* Add Story Modal */}
            {showModal && <StoryModal setShowModal={setShowModal} fetchStories={fetchStories} />}

            {/* View Story Modal */}
            {viewStory && <StoryViewer viewStory={viewStory} setViewStory={setViewStory} />}
        </div>
    )
}

export default StoriesBar