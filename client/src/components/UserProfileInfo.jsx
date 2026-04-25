import { Calendar, MapPin, PenBox, Verified } from "lucide-react"
import moment from "moment"
import React from "react"

const UserProfileInfo = ({ user, posts, profileId, setShowEdit }) => {
    return (
        <div className="relative px-6 md:px-8 pt-0 pb-6 bg-[var(--surface)]">
            {/* Avatar */}
            <div className="absolute -top-14 left-6 md:left-8 w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white overflow-hidden shadow-md bg-white">
                <img
                    src={user.profile_picture}
                    alt="your profile picture"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Main content starts after avatar */}
            <div className="pt-20 md:pt-6 md:pl-36">
                {/* Top row: name block + edit button */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h1 className="text-2xl font-semibold text-[var(--text)] leading-tight">
                                {user.full_name}
                            </h1>
                            <Verified className="w-5 h-5 text-[var(--brand-dark)] shrink-0" />
                        </div>

                        <p className="text-[var(--muted)] text-sm mt-1">
                            {user.username ? `@${user.username}` : "Add a username"}
                        </p>
                    </div>

                    {/* If the user is not on another user's profile--that means they are opening their own profile--then we will give edit button */}
                    {!profileId && (
                        <button
                            onClick={() => setShowEdit(true)}
                            className="secondary-btn flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm shrink-0 self-start"
                        >
                            <PenBox className="w-4 h-4" />
                            Edit
                        </button>
                    )}
                </div>

                {/* Bio */}
                {user.bio && (
                    <p className="mt-4 text-[var(--text)] text-sm leading-relaxed max-w-2xl">
                        {user.bio}
                    </p>
                )}

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--muted)] mt-4">
                    <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {user.location ? user.location : "Add location"}
                    </span>

                    <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        Joined{" "}
                        <span className="font-medium text-[var(--text)]">
                            {moment(user.createdAt).fromNow()}
                        </span>
                    </span>
                </div>

                {/* Stats */}
                <div className="mt-6 pt-4 border-t border-[var(--border)] flex flex-wrap items-center gap-6 text-sm">
                    <div>
                        <span className="font-semibold text-[var(--text)]">{posts?.length || 0}</span>
                        <span className="ml-1 text-[var(--muted)]">Posts</span>
                    </div>

                    <div>
                        <span className="font-semibold text-[var(--text)]">{user.followers?.length || 0}</span>
                        <span className="ml-1 text-[var(--muted)]">Followers</span>
                    </div>

                    <div>
                        <span className="font-semibold text-[var(--text)]">{user.following?.length || 0}</span>
                        <span className="ml-1 text-[var(--muted)]">Following</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfileInfo