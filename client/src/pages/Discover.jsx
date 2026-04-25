import React, { useEffect, useState } from "react"
import { Search } from "lucide-react"
import UserCard from "../components/UserCard"
import Loading from "../components/Loading"
import api from "../api/axios"
import { useAuth } from "@clerk/react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { fetchUser } from "../features/user/userSlice"

const Discover = () => {
    const dispatch = useDispatch()
    const [input, setInput] = useState('')
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const { getToken } = useAuth()

    const handleSearch = async (e) => {
        if (e.key === 'Enter') {
            try {
                setUsers([])
                setLoading(true)

                const { data } = await api.post('/api/user/discover', { input }, {
                    headers: { Authorization: `Bearer ${await getToken()}` }
                })

                data.success ? setUsers(data.users) : toast.error(data.message)
                setInput('')
            } catch (error) {
                toast.error(error.message)
            }
            setLoading(false)
        }
    }

    useEffect(() => {
        getToken().then((token) => {
            dispatch(fetchUser(token))
        })
    }, [])

    return (
        <div className="min-h-screen app-shell">
            <div className="max-w-6xl mx-auto p-6">
                {/* Title */}
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-[var(--text)] mb-2">Discover People</h1>
                    <p className="text-[var(--muted)]">
                        Find people by name, username, bio, or location.
                    </p>
                </div>

                {/* Search */}
                <div className="mb-8 surface-card rounded-xl">
                    <div className="p-5">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-soft)] w-5 h-5" />
                            <input
                                type='text'
                                placeholder="Search people by name, username, bio, or location..."
                                className="pl-10 sm:pl-12 py-3 w-full border border-[var(--border)] rounded-lg bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--muted-soft)] max-sm:text-sm focus:outline-none"
                                onChange={(e) => setInput(e.target.value)}
                                value={input}
                                onKeyUp={handleSearch}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-6">
                    {users.map((user) => (
                        <UserCard user={user} key={user._id} />
                    ))}
                </div>

                {loading && <Loading height='60vh' />}
            </div>
        </div>
    )
}

export default Discover