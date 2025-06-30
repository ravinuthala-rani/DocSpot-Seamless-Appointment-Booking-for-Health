import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Calendar, Clock, Users, DollarSign, CheckCircle, XCircle, User } from 'lucide-react'
import { format } from 'date-fns'

interface DoctorStats {
  totalPatients: number
  todayAppointments: number
  monthlyEarnings: number
  completedAppointments: number
}

interface Appointment {
  id: string
  patientName: string
  patientEmail: string
  date: string
  time: string
  status: 'scheduled' | 'completed' | 'cancelled' | 'pending'
  reason: string
  consultationFee: number
}

const DoctorDashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState<DoctorStats | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockStats: DoctorStats = {
        totalPatients: 245,
        todayAppointments: 8,
        monthlyEarnings: 18500,
        completedAppointments: 189
      }

      const mockAppointments: Appointment[] = [
        {
          id: '1',
          patientName: 'John Smith',
          patientEmail: 'john.smith@email.com',
          date: format(new Date(), 'yyyy-MM-dd'),
          time: '09:00 AM',
          status: 'scheduled',
          reason: 'Routine cardiac check-up',
          consultationFee: 150
        },
        {
          id: '2',
          patientName: 'Emma Johnson',
          patientEmail: 'emma.johnson@email.com',
          date: format(new Date(), 'yyyy-MM-dd'),
          time: '10:30 AM',
          status: 'pending',
          reason: 'Chest pain consultation',
          consultationFee: 150
        },
        {
          id: '3',
          patientName: 'Michael Brown',
          patientEmail: 'michael.brown@email.com',
          date: format(new Date(), 'yyyy-MM-dd'),
          time: '02:00 PM',
          status: 'scheduled',
          reason: 'Follow-up appointment',
          consultationFee: 150
        },
        {
          id: '4',
          patientName: 'Sarah Davis',
          patientEmail: 'sarah.davis@email.com',
          date: format(new Date(), 'yyyy-MM-dd'),
          time: '03:30 PM',
          status: 'completed',
          reason: 'Annual physical examination',
          consultationFee: 150
        }
      ]
      
      setStats(mockStats)
      setAppointments(mockAppointments)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const handleConfirmAppointment = (appointmentId: string) => {
    setAppointments(prev =>
      prev.map(appointment =>
        appointment.id === appointmentId
          ? { ...appointment, status: 'scheduled' as const }
          : appointment
      )
    )
  }

  const handleCompleteAppointment = (appointmentId: string) => {
    setAppointments(prev =>
      prev.map(appointment =>
        appointment.id === appointmentId
          ? { ...appointment, status: 'completed' as const }
          : appointment
      )
    )
  }

  const handleCancelAppointment = (appointmentId: string) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(prev =>
        prev.map(appointment =>
          appointment.id === appointmentId
            ? { ...appointment, status: 'cancelled' as const }
            : appointment
        )
      )
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const todayAppointments = appointments.filter(
    appointment => appointment.date === format(selectedDate, 'yyyy-MM-dd')
  )

  if (!user || user.role !== 'doctor') {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctor Dashboard</h1>
          <p className="text-gray-600">Welcome back, Dr. {user.name}</p>
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
                <p className="text-2xl font-bold text-gray-900">{stats?.totalPatients}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                <p className="text-2xl font-bold text-gray-900">{todayAppointments.length}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Earnings</p>
                <p className="text-2xl font-bold text-gray-900">${stats?.monthlyEarnings.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.completedAppointments}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Today's Schedule</h3>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</span>
            </div>
          </div>

          {todayAppointments.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No appointments scheduled for today</p>
            </div>
          ) : (
            <div className="space-y-4">
              {todayAppointments.map(appointment => (
                <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {appointment.patientName}
                          </h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{appointment.patientEmail}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-2" />
                            <span>${appointment.consultationFee}</span>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">
                            <strong>Reason:</strong> {appointment.reason}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 lg:ml-4">
                      {appointment.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleConfirmAppointment(appointment.id)}
                            className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Confirm
                          </button>
                          <button
                            onClick={() => handleCancelAppointment(appointment.id)}
                            className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Decline
                          </button>
                        </>
                      )}
                      {appointment.status === 'scheduled' && (
                        <>
                          <button
                            onClick={() => handleCompleteAppointment(appointment.id)}
                            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Complete
                          </button>
                          <button
                            onClick={() => handleCancelAppointment(appointment.id)}
                            className="btn-secondary text-sm"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {appointment.status === 'completed' && (
                        <span className="text-sm text-green-600 font-medium">
                          Completed
                        </span>
                      )}
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

export default DoctorDashboard