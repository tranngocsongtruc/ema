import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from "../components/Loading"
import UserProfileInfo from "../components/UserProfileInfo"
import PostCard from "../components/PostCard"
import ProfileModal from "../components/ProfileModal"
import { useAuth } from "@clerk/react"
import api from "../api/axios"
import toast from "react-hot-toast"

const Profile = () => {
    const { profileId } = useParams()
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])
    const [showEdit, setShowEdit] = useState(false)
    const { getToken } = useAuth()

    const fetchUser = async () => {
        try {
            const token = await getToken()

            const { data } = await api.get(
                profileId ? `/api/user/${profileId}` : `/api/user/data`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )

            if (data.success) {
                setUser(data.user)
            } else {
                toast.error(data.message)
            }

            const postRes = await api.get('/api/post/feed', {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (postRes.data.success) {
                setPosts(postRes.data.posts.filter(
                    p => p.user._id === (profileId || data.user._id)
                ))
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [profileId])

    return user ? (
        <div className="h-full overflow-y-scroll bg-[var(--bg)] py-6">
            <div className="max-w-4xl mx-auto px-4 space-y-6">
                {/* Profile Card */}
                <div className="surface-card rounded-xl overflow-hidden">
                    {/* Cover */}
                    <div className="h-40 md:h-56 bg-[var(--surface-muted)]">
                        {user.cover_photo && (
                            <img
                                src={user.cover_photo}
                                className="w-full h-full object-cover"
                                alt="the cover photo of the user"
                            />
                        )}
                    </div>

                    {/* User Info */}
                    <UserProfileInfo
                        user={user}
                        posts={posts}
                        profileId={profileId}
                        setShowEdit={setShowEdit}
                    />
                </div>

                {/* Posts */}
                <div className="space-y-6">
                    {posts.map((post) => (
                        <div key={post._id} className="w-full flex justify-center">
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </div>

            {showEdit && <ProfileModal setShowEdit={setShowEdit} />}
        </div>
    ) : <Loading />
}

export default Profile