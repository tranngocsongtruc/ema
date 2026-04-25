import React from "react"

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[var(--background)] px-6 py-12 text-[var(--text)]">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Privacy Policy</h1>

        <p className="text-[var(--muted)] mb-4">
            EMA is an early-stage project and will continue to evolve. We are committed to improving privacy and clarity as the platform grows.
        </p>

        <p className="text-[var(--muted)] mb-4">
          This social network is designed to feel simple, calm, and respectful of your space.
        </p>

        <p className="mb-4">
          We only collect the information necessary to make the platform work such as your account details and content you choose to share.
        </p>

        <p className="mb-4">
          We do not sell your data. We do not use your content for advertising purposes.
        </p>

        <p className="mb-4">
          Your conversations and interactions are intended to stay private between you and the people you connect with.
        </p>

        <p className="mt-8 text-sm text-[var(--muted)]">
          © 2026 Truc Tran. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Privacy