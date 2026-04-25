import React, { useState } from "react"
import { Pencil } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../features/user/userSlice"
import { useAuth } from "@clerk/react"
import toast from "react-hot-toast"

const ProfileModal = ({ setShowEdit }) => {
    const dispatch = useDispatch()
    const { getToken } = useAuth()
    const user = useSelector((state) => state.user.value)

    const [editForm, setEditForm] = useState({
        username: user.username || "",
        bio: user.bio || "",
        location: user.location || "",
        profile_picture: null,
        cover_photo: null,
        full_name: user.full_name || "",
    })

    const handleSaveProfile = async (e) => {
        e.preventDefault()

        try {
            const userData = new FormData()
            userData.append("username", editForm.username)
            userData.append("bio", editForm.bio)
            userData.append("location", editForm.location)
            userData.append("full_name", editForm.full_name)

            if (editForm.profile_picture) userData.append("profile", editForm.profile_picture)
            if (editForm.cover_photo) userData.append("cover", editForm.cover_photo)

            const token = await getToken()
            await dispatch(updateUser({ userData, token })).unwrap()

            setShowEdit(false)
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="fixed inset-0 z-[110] bg-black/45 backdrop-blur-sm overflow-y-auto px-4 py-8">
            <div className="surface-card w-full max-w-2xl mx-auto rounded-xl p-6">
                <div className="mb-6">
                    <h1 className="text-xl font-semibold text-[var(--text)]">Edit Profile</h1>
                    <p className="text-sm text-[var(--muted)] mt-1">Update how people see you on EMA.</p>
                </div>

                <form
                    className="space-y-5"
                    onSubmit={(e) => toast.promise(handleSaveProfile(e), { loading: "Saving..." })}
                >
                    <div className="grid gap-5 sm:grid-cols-[120px_1fr]">
                        <label htmlFor="profile_picture" className="block text-sm font-medium text-[var(--text)]">
                            Profile Picture
                            <input
                                hidden
                                type="file"
                                accept="image/*"
                                id="profile_picture"
                                onChange={(e) => setEditForm({ ...editForm, profile_picture: e.target.files[0] })}
                            />
                            <div className="group/profile relative mt-3 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-white cursor-pointer">
                                <img
                                    src={editForm.profile_picture ? URL.createObjectURL(editForm.profile_picture) : user.profile_picture}
                                    alt="your current profile picture"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 hidden group-hover/profile:flex bg-black/25 rounded-full items-center justify-center">
                                    <Pencil className="w-5 h-5 text-white" />
                                </div>
                            </div>
                        </label>

                        <label htmlFor="cover_photo" className="block text-sm font-medium text-[var(--text)]">
                            Cover Photo
                            <input
                                hidden
                                type="file"
                                accept="image/*"
                                id="cover_photo"
                                onChange={(e) => setEditForm({ ...editForm, cover_photo: e.target.files[0] })}
                            />
                            <div className="group/cover relative mt-3 w-full h-40 rounded-lg overflow-hidden border border-[var(--border)] bg-[var(--surface-muted)] cursor-pointer">
                                <img
                                    src={editForm.cover_photo ? URL.createObjectURL(editForm.cover_photo) : user.cover_photo}
                                    alt="your current cover photo"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 hidden group-hover/cover:flex bg-black/25 items-center justify-center">
                                    <Pencil className="w-5 h-5 text-white" />
                                </div>
                            </div>
                        </label>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text)] mb-1">Name</label>
                            <input
                                type="text"
                                className="ui-input w-full"
                                value={editForm.full_name}
                                onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text)] mb-1">Username</label>
                            <input
                                type="text"
                                className="ui-input w-full"
                                value={editForm.username}
                                onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text)] mb-1">Bio</label>
                        <textarea
                            rows={3}
                            className="ui-input w-full py-3 resize-none"
                            value={editForm.bio}
                            onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text)] mb-1">Location</label>
                        <input
                            type="text"
                            className="ui-input w-full"
                            value={editForm.location}
                            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
                        <button
                            onClick={() => setShowEdit(false)}
                            type="button"
                            className="secondary-btn px-4 py-2 rounded-lg text-sm font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="primary-btn px-4 py-2 rounded-lg text-sm font-medium"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProfileModal