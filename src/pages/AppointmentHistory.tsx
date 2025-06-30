import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Calendar, Clock, MapPin, User, FileText, Filter, Search } from 'lucide-react'
import { format } from 'date-fns'

interface Appointment {
  id: string
  doctorId: string
  doctorName: string
  doctorSpecialty: string
  doctorAvatar: string
  date: string
  time: string
  status: 'scheduled' | 'completed' | 'cancelled' | 'pending'
  reason: string
  consultationFee: number
  location: string
}

const AppointmentHistory = () => {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([])
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const statusOptions = [
    { value: 'all', label: 'All Appointments' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'pending', label: 'Pending' }
  ]

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockAppointments: Appointment[] = [
        {
          id: '1',
          doctorId: '1',
          doctorName: 'Dr. Sarah Johnson',
          doctorSpecialty: 'Cardiology',
          doctorAvatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
          date: '2024-01-15',
          time: '10:00 AM',
          status: 'scheduled',
          reason: 'Routine cardiac check-up',
          consultationFee: 150,
          location: 'New York, NY'
        },
        {
          id: '2',
          doctorId: '2',
          doctorName: 'Dr. Michael Chen',
          doctorSpecialty: 'Dermatology',
          doctorAvatar: 'https://images.pexels.com/photos/612608/pexels-photo-612608.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
          date: '2024-01-10',
          time: '2:30 PM',
          status: 'completed',
          reason: 'Skin consultation for acne treatment',
          consultationFee: 120,
          location: 'Los Angeles, CA'
        },
        {
          id: '3',
          doctorId: '3',
          doctorName: 'Dr. Emily Rodriguez',
          doctorSpecialty: 'Neurology',
          doctorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
          date: '2024-01-20',
          time: '11:30 AM',
          status: 'pending',
          reason: 'Headache and migraine consultation',
          consultationFee: 180,
          location: 'Chicago, IL'
        },
        {
          id: '4',
          doctorId: '1',
          doctorName: 'Dr. Sarah Johnson',
          doctorSpecialty: 'Cardiology',
          doctorAvatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
          date: '2023-12-20',
          time: '9:00 AM',
          status: 'cancelled',
          reason: 'Annual physical examination',
          consultationFee: 150,
          location: 'New York, NY'
        }
      ]
      
      setAppointments(mockAppointments)
      setFilteredAppointments(mockAppointments)
      setIsLoading(false)
    }

    fetchAppointments()
  }, [])

  useEffect(() => {
    let filtered = appointments

    if (statusFilter !== 'all') {
      filtered = filtered.filter(appointment => appointment.status === statusFilter)
    }

    if (searchTerm) {
      filtered = filtered.filter(appointment =>
        appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.doctorSpecialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.reason.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredAppointments(filtered)
  }, [appointments, statusFilter, searchTerm])

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

  const handleCancelAppointment = async (appointmentId: string) => {
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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your appointments</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointment History</h1>
          <p className="text-gray-600">Manage and track all your medical appointments</p>
        </div>

        {/* Filters */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div className="md:w-64">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="input-field pl-10"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="card animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No appointments found</h3>
            <p className="text-gray-600">
              {statusFilter === 'all' 
                ? "You haven't booked any appointments yet." 
                : `No ${statusFilter} appointments found.`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map(appointment => (
              <div key={appointment.id} className="card hover-lift">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                    <img
                      src={appointment.doctorAvatar}
                      alt={appointment.doctorName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {appointment.doctorName}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-primary-600 font-medium mb-2">{appointment.doctorSpecialty}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{format(new Date(appointment.date), 'EEEE, MMMM d, yyyy')}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{appointment.location}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium">${appointment.consultationFee}</span>
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <div className="flex items-start">
                          <FileText className="w-4 h-4 mr-2 mt-0.5 text-gray-400" />
                          <span className="text-sm text-gray-600">{appointment.reason}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 lg:ml-4">
                    {appointment.status === 'scheduled' && (
                      <>
                        <button className="btn-secondary text-sm">
                          Reschedule
                        </button>
                        <button
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {appointment.status === 'completed' && (
                      <button className="btn-secondary text-sm">
                        View Report
                      </button>
                    )}
                    {appointment.status === 'pending' && (
                      <span className="text-sm text-yellow-600 font-medium">
                        Awaiting confirmation
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
  )
}

export default AppointmentHistory