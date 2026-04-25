import { BadgeCheck, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const StoryViewer = ({ viewStory, setViewStory }) => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        let timer, progressInterval

        if (viewStory && viewStory.media_type !== 'video') {
            setProgress(0)

            const duration = 10000
            const stepTime = 100
            let elapsed = 0

            progressInterval = setInterval(() => {
                elapsed += stepTime
                setProgress((elapsed / duration) * 100)
            }, stepTime)

            timer = setTimeout(() => setViewStory(null), duration)
        }

        return () => {
            clearTimeout(timer)
            clearInterval(progressInterval)
        }
    }, [viewStory, setViewStory])

    const renderContent = () => {
        switch (viewStory.media_type) {
            case 'image':
                return <img src={viewStory.media_url} alt="story media" className='max-w-full max-h-screen object-contain' />
            case 'video':
                return <video onEnded={() => setViewStory(null)} src={viewStory.media_url} className='max-h-screen' controls autoPlay />
            case 'text':
                return <div className='w-full h-full flex items-center justify-center p-8 text-white text-2xl text-center'>{viewStory.content}</div>
            default:
                return null
        }
    }

    return (
        <div
            className='fixed inset-0 h-screen bg-black/90 z-[110] flex items-center justify-center'
            style={{ backgroundColor: viewStory.media_type === 'text' ? viewStory.background_color : '#000000' }}
        >
            {viewStory.media_type !== 'video' && (
                <div className='absolute top-0 left-0 w-full h-1 bg-white/20'>
                    <div className='h-full bg-white transition-all duration-100 linear' style={{ width: `${progress}%` }} />
                </div>
            )}

            <div className='absolute top-4 left-4 flex items-center space-x-3 p-2 px-4 backdrop-blur-2xl rounded-lg bg-black/45'>
                <img
                    src={viewStory.user?.profile_picture}
                    alt="the profile picture of the user whose story is displaying"
                    className='size-8 rounded-full object-cover border border-white/80'
                />
                <div className='text-white font-medium flex items-center gap-1.5'>
                    <span>{viewStory.user?.full_name}</span>
                    <BadgeCheck size={18} />
                </div>
            </div>

            <button onClick={() => setViewStory(null)} className='absolute top-4 right-4 text-white focus:outline-none'>
                <X className='w-8 h-8 hover:scale-105 transition cursor-pointer' />
            </button>

            <div className='max-w-[90vw] max-h-[90vh] flex items-center justify-center'>
                {renderContent()}
            </div>
        </div>
    )
}

export default StoryViewer