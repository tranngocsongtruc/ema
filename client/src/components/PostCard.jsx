import { BadgeCheck, Heart, MessageCircle, Share2 } from 'lucide-react'
import moment from 'moment'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAuth } from '@clerk/react'
import api from '../api/axios'
import toast from 'react-hot-toast'

const PostCard = ({ post }) => {
    const postWithHashtags = post.content.replace(
        /(#\w+)/g,
        '<span class="text-[#738d7c] font-medium">$1</span>'
    )

    const [likes, setLikes] = useState(post.likes_count)
    const currentUser = useSelector((state) => state.user.value)
    const { getToken } = useAuth()
    const navigate = useNavigate()

    const handleLike = async () => {
        try {
            const { data } = await api.post(
                '/api/post/like',
                { postId: post._id },
                { headers: { Authorization: `Bearer ${await getToken()}` } }
            )

            if (data.success) {
                toast.success(data.message)
                setLikes((prev) => {
                    if (prev.includes(currentUser._id)) {
                        return prev.filter((id) => id !== currentUser._id)
                    } else {
                        return [...prev, currentUser._id]
                    }
                })
            } else {
                toast(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='surface-card rounded-xl p-4 space-y-4 w-full max-w-2xl'>
            {/* User Info */}
            <div
                onClick={() => navigate('/profile/' + post.user._id)}
                className='inline-flex items-center gap-3 cursor-pointer'
            >
                <img
                    src={post.user.profile_picture}
                    alt='the profile picture of the user'
                    className='w-10 h-10 rounded-full shadow'
                />
                <div>
                    <div className='flex items-center space-x-1'>
                        <span className='text-[var(--text)] font-medium'>{post.user.full_name}</span>
                        <BadgeCheck className='w-4 h-4 text-[var(--brand-dark)]' />
                    </div>
                    <div className='text-[var(--muted)] text-sm'>
                        @{post.user.username} • {moment(post.createdAt).fromNow()}
                    </div>
                </div>
            </div>

            {/* Content */}
            {post.content && (
                <div
                    className='text-[var(--text)] text-sm leading-relaxed whitespace-pre-line'
                    dangerouslySetInnerHTML={{ __html: postWithHashtags }}
                />
            )}

            {/* Images */}
            <div>
                {post.image_urls.map((img, index) => (
                    <img
                        src={img}
                        key={index}
                        className={`w-full h-48 object-cover rounded-lg ${post.image_urls.length === 1 && 'col-span-2 h-auto'}`}
                        alt="the image of the post"
                    />
                ))}
            </div>

            {/* Actions */}
            <div className='flex items-center gap-4 text-[var(--muted)] text-sm pt-2 border-t border-[var(--border)]'>
                <div className='flex items-center gap-1'>
                    <Heart
                        className={`w-4 h-4 cursor-pointer ${likes.includes(currentUser._id) && 'text-red-500 fill-red-500'}`}
                        onClick={handleLike}
                    />
                    <span>{likes.length}</span>
                </div>

                {/* Placeholder number of messages */}
                <div className='flex items-center gap-1'>
                    <MessageCircle className='w-4 h-4' />
                    <span>{12}</span>
                </div>
                {/* Placeholder number of sharing actions */}
                <div className='flex items-center gap-1'>
                    <Share2 className='w-4 h-4' />
                    <span>{7}</span>
                </div>
            </div>
        </div>
    )
}

export default PostCard