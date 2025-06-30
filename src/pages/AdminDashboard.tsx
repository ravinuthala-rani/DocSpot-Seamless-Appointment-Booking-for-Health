import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Users, Calendar, TrendingUp, Activity, UserCheck, UserX, Clock, DollarSign } from 'lucide-react'

interface Stats {
  totalPatients: number
  totalDoctors: number
  totalAppointments: number
  pendingApprovals: number
  monthlyRevenue: number
  completedAppointments: number
}

interface PendingDoctor {
  id: string
  name: string
  email: string
  specialty: string
  experience: number
  submittedAt: string
}

const AdminDashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState<Stats | null>(null)
  const [pendingDoctors, setPendingDoctors] = useState<PendingDoctor[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockStats: Stats = {
        totalPatients: 1250,
        totalDoctors: 45,
        totalAppointments: 3420,
        pendingApprovals: 8,
        monthlyRevenue: 125000,
        completedAppointments: 2890
      }

      const mockPendingDoctors: PendingDoctor[] = [
        {
          id: '1',
          name: 'Dr. James Wilson',
          email: 'james.wilson@email.com',
          specialty: 'Orthopedics',
          experience: 8,
          submittedAt: '2024-01-10'
        },
        {
          id: '2',
          name: 'Dr. Maria Garcia',
          email: 'maria.garcia@email.com',
          specialty: 'Pediatrics',
          experience: 12,
          submittedAt: '2024-01-09'
        },
        {
          id: '3',
          name: 'Dr. Robert Kim',
          email: 'robert.kim@email.com',
          specialty: 'Psychiatry',
          experience: 6,
          submittedAt: '2024-01-08'
        }
      ]
      
      setStats(mockStats)
      setPendingDoctors(mockPendingDoctors)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const handleApproveDoctor = async (doctorId: string) => {
    setPendingDoctors(prev => prev.filter(doctor => doctor.id !== doctorId))
    // In a real app, this would make an API call
    alert('Doctor approved successfully!')
  }

  const handleRejectDoctor = async (doctorId: string) => {
    setPendingDoctors(prev => prev.filter(doctor => doctor.id !== doctorId))
    // In a real app, this would make an API call
    alert('Doctor application rejected.')
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-8 w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="card">
                  <div className="h-16 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your healthcare platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.totalPatients.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Doctors</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.totalDoctors}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.totalAppointments.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.pendingApprovals}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Monthly Revenue</h3>
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">${stats?.monthlyRevenue.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-1">+12% from last month</p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Completed Appointments</h3>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600">{stats?.completedAppointments.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-1">84.5% completion rate</p>
          </div>
        </div>

        {/* Pending Doctor Approvals */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Pending Doctor Approvals</h3>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              {pendingDoctors.length} pending
            </span>
          </div>

          {pendingDoctors.length === 0 ? (
            <div className="text-center py-8">
              <UserCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No pending doctor approvals</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingDoctors.map(doctor => (
                <div key={doctor.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <h4 className="text-lg font-semibold text-gray-900">{doctor.name}</h4>
                      <p className="text-primary-600 font-medium">{doctor.specialty}</p>
                      <div className="text-sm text-gray-600 mt-1">
                        <p>Email: {doctor.email}</p>
                        <p>Experience: {doctor.experience} years</p>
                        <p>Submitted: {new Date(doctor.submittedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleApproveDoctor(doctor.id)}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <UserCheck className="w-4 h-4 mr-2" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectDoctor(doctor.id)}
                        className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <UserX className="w-4 h-4 mr-2" />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard