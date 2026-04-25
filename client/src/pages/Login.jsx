import React from "react"
import { assets } from "../assets/assets"
import { Sprout, Star } from "lucide-react"
import { SignIn } from '@clerk/react'
import { Link } from "react-router-dom"

const Login = () => {
    return (
        <div className='min-h-screen relative flex flex-col md:flex-row overflow-x-hidden md:overflow-hidden'>
            {/* Background Image */}
            <img
                src={assets.bg_all}
                alt="general background image of the website with light orange and green colors"
                className="absolute inset-0 -z-10 w-full h-full object-cover"
            />

            {/* Soft overlay */}
            <div className="absolute inset-0 -z-10 bg-[rgba(247,243,234,0.72)]" />

            {/* Left side: Branding */}
            <div className="flex-1 relative flex flex-col justify-center p-6 pt-32 md:p-10 lg:pl-16 xl:pl-20 pr-4 md:pr-8 md:items-end">
                <img
                    src={assets.logo_gif}
                    alt="logo of the website with words saying EMA Social Network"
                    className="absolute top-8 left-6 md:top-16 md:left-20 w-24 sm:w-28 md:w-44 object-contain"
                />
                <div className="w-full max-w-md mt-6 md:mt-0 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-1 mb-5">
                        <img
                            src={assets.group_users}
                            alt="groups of default users' profile pictures"
                            className="h-8 md:h-10"
                        />
                        <div>
                            <div className="flex">
                                {Array(5).fill(0).map((_, i) => (
                                    <Sprout
                                        key={i}
                                        className="size-4 text-transparent fill-[var(--accent)]"
                                    />
                                ))}
                            </div>
                            <p className="text-sm text-[var(--muted)]">
                                Social Network
                            </p>
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-[var(--text)]">
                        EMA
                    </h1>

                    <p className="mt-4 text-base md:text-xl text-[var(--muted)] max-w-lg mx-auto md:mx-0 leading-relaxed">
                        Build Your Communities And Keep In Touch
                    </p>

                    <p className="mt-4 text-sm md:text-base text-[var(--brand-dark)] font-medium max-w-md mx-auto md:mx-0">
                        comfortable place to share who you are and stay close to your communities
                    </p>
                </div>

                <span className="md:h-10"></span>
            </div>

            {/* Right side: Login Form */}
            <div className="flex-1 flex items-center justify-center md:justify-start px-4 py-4 sm:p-6">
                <div className="w-full max-w-[390px] sm:w-auto sm:max-w-none sm:surface-card sm:rounded-xl sm:p-6">
                    <SignIn />
                </div>
            </div>

            {/* Footer Links */}
            <div className="w-full md:absolute md:bottom-5 md:left-0 md:right-0 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-6 pb-6 md:pb-0 text-xs text-[var(--muted)] text-center">
                <Link to="/privacy" className="hover:text-[var(--text)] transition">
                    Privacy Policy
                </Link>
                <span>•</span>
                <Link to="/accessibility" className="hover:text-[var(--text)] transition">
                    Accessibility
                </Link>
                <span>•</span>
                <span>© 2026 Truc Tran</span>
                <span>•</span>
                <span>Early version</span>
            </div>
        </div>
    )
}

export default Login