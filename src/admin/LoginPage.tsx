import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Mail, Lock, AlertCircle } from 'lucide-react'
import { useAuth } from './AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate network delay
    setTimeout(() => {
      const success = login(email, password)
      if (success) {
        navigate('/admin', { replace: true })
      } else {
        setError('Invalid email or password.')
        setLoading(false)
      }
    }, 400)
  }

  return (
    <div className="min-h-screen bg-gray-50/80 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
            <Shield size={18} className="text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-900 tracking-tight">
            AI Tools Hub
          </span>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <div className="mb-6">
            <h1 className="text-lg font-semibold text-gray-900 mb-1">Admin Login</h1>
            <p className="text-sm text-gray-500">Sign in to access the admin panel.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 px-3.5 py-2.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                <AlertCircle size={16} className="flex-shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="admin@aitoolshub.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="Enter password"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center">
              Demo: <span className="text-gray-500">admin@aitoolshub.com</span> / <span className="text-gray-500">admin123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
