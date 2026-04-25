import React, { useState } from "react"
import { Image, X } from "lucide-react"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { useAuth } from "@clerk/react"
import api from "../api/axios"
import { useNavigate } from "react-router-dom"

const CreatePost = () => {
    const navigate = useNavigate()
    const [content, setContent] = useState('')
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)

    const user = useSelector((state) => state.user.value)
    const { getToken } = useAuth()

    const handleSubmit = async () => {
        if (!images.length && !content) {
            return toast.error('Please add at least one image or text')
        }

        setLoading(true)
        const postType = images.length && content ? 'text_with_image' : images.length ? 'image' : 'text'

        try {
            const formData = new FormData()
            formData.append('content', content)
            formData.append('post_type', postType)
            images.forEach((image) => {
                formData.append('images', image)
            })

            const { data } = await api.post('/api/post/add', formData, {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })

            if (data.success) {
                navigate('/')
            } else {
                throw new Error(data.message)
            }
        } catch (error) {
            throw new Error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen app-shell">
            <div className="max-w-5xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-[var(--text)] mb-2">Create Post</h1>
                    <p className="text-[var(--muted)]">Share something with the people around you.</p>
                </div>

                <div className="surface-card max-w-2xl rounded-xl p-5 sm:p-6 space-y-5">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                        <img
                            src={user.profile_picture}
                            alt="your profile picture"
                            className="w-12 h-12 rounded-full object-cover shadow-sm"
                        />
                        <div>
                            <h2 className="font-semibold text-[var(--text)]">{user.full_name}</h2>
                            <p className="text-sm text-[var(--muted)]">@{user.username}</p>
                        </div>
                    </div>

                    {/* Text Area */}
                    <textarea
                        className="w-full min-h-28 resize-none border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-[var(--text)] bg-[var(--surface)] placeholder:text-[var(--muted-soft)] focus:outline-none"
                        placeholder="Share something..."
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                    />

                    {/* Images */}
                    {images.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                            {images.map((image, i) => (
                                <div key={i} className="relative group">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        className="h-24 w-auto rounded-lg object-cover border border-[var(--border)]"
                                        alt="the image and/or images of your post"
                                    />
                                    <div
                                        onClick={() => setImages(images.filter((_, index) => index !== i))}
                                        className="absolute inset-0 hidden group-hover:flex justify-center items-center bg-black/35 rounded-lg cursor-pointer"
                                    >
                                        <X className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Bottom Bar */}
                    <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                        <label
                            htmlFor="images"
                            className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--text)] transition cursor-pointer"
                        >
                            <Image className="size-5" />
                            Add image
                        </label>

                        <input
                            type="file"
                            id="images"
                            accept="image/*"
                            hidden
                            multiple
                            onChange={(e) => setImages([...images, ...e.target.files])}
                        />

                        <button
                            disabled={loading}
                            onClick={() =>
                                toast.promise(handleSubmit(), {
                                    loading: 'Uploading...',
                                    success: <p>Post added</p>,
                                    error: <p>Post not added</p>,
                                })
                            }
                            className="primary-btn px-5 py-2 rounded-lg text-sm font-medium active:scale-[0.98] transition disabled:opacity-70"
                        >
                            Publish Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost