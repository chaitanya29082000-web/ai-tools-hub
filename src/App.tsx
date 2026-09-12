import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/AdminDashboard'
import ToolsManager from './admin/ToolsManager'
import CategoriesManager from './admin/CategoriesManager'
import LoginPage from './admin/LoginPage'
import ProtectedRoute from './admin/ProtectedRoute'
import { AdminProvider } from './admin/AdminContext'
import { AuthProvider } from './admin/AuthContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AdminProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/tools"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <ToolsManager />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <CategoriesManager />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AdminProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
