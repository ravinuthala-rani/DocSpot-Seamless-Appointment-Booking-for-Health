import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Calendar, Clock, MapPin, Star, Search, Filter } from 'lucide-react'

interface Doctor {
  id: string
  name: string
  specialty: string
  rating: number
  experience: number
  location: string
  avatar: string
  availability: string[]
  consultationFee: number
}

const Dashboard = () => {
  const { user } = useAuth()
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const specialties = [
    'All Specialties',
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Psychiatry',
    'General Medicine'
  ]

  useEffect(() => {
    // Simulate API call to fetch doctors
    const fetchDoctors = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockDoctors: Doctor[] = [
        {
          id: '1',
          name: 'Dr. Sarah Johnson',
          specialty: 'Cardiology',
          rating: 4.9,
          experience: 12,
          location: 'New York, NY',
          avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
          availability: ['Morning', 'Afternoon'],
          consultationFee: 150
        },
        {
          id: '2',
          name: 'Dr. Michael Chen',
          specialty: 'Dermatology',
          rating: 4.8,
          experience: 8,
          location: 'Los Angeles, CA',
          avatar: 'https://images.pexels.com/photos/612608/pexels-photo-612608.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
          availability: ['Morning', 'Evening'],
          consultationFee: 120
        },
        {
          id: '3',
          name: 'Dr. Emily Rodriguez',
          specialty: 'Neurology',
          rating: 4.7,
          experience: 15,
          location: 'Chicago, IL',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
          availability: ['Afternoon', 'Evening'],
          consultationFee: 180
        },
        {
          id: '4',
          name: 'Dr. David Wilson',
          specialty: 'Orthopedics',
          rating: 4.6,
          experience: 10,
          location: 'Houston, TX',
          avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
          availability: ['Morning'],
          consultationFee: 160
        },
        {
          id: '5',
          name: 'Dr. Lisa Thompson',
          specialty: 'Pediatrics',
          rating: 4.9,
          experience: 14,
          location: 'Miami, FL',
          avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
          availability: ['Morning', 'Afternoon', 'Evening'],
          consultationFee: 140
        },
        {
          id: '6',
          name: 'Dr. Robert Martinez',
          specialty: 'General Medicine',
          rating: 4.5,
          experience: 7,
          location: 'Phoenix, AZ',
          avatar: 'https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
          availability: ['Afternoon', 'Evening'],
          consultationFee: 100
        }
      ]
      
      setDoctors(mockDoctors)
      setIsLoading(false)
    }

    fetchDoctors()
  }, [])

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = selectedSpecialty === '' || selectedSpecialty === 'All Specialties' ||
                            doctor.specialty === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to access the dashboard</h2>
          <Link to="/login" className="btn-primary">
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">Find and book appointments with qualified healthcare providers</p>
        </div>

        {/* Search and Filter Section */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search doctors by name or specialty..."
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
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="input-field pl-10"
                >
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="card animate-pulse">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map(doctor => (
              <div key={doctor.id} className="card hover-lift">
                <div className="flex items-center mb-4">
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                    <p className="text-primary-600 font-medium">{doctor.specialty}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-4 h-4 text-yellow-400 mr-2 fill-current" />
                    <span className="font-medium">{doctor.rating}</span>
                    <span className="mx-2">•</span>
                    <span>{doctor.experience} years experience</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{doctor.location}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Available: {doctor.availability.join(', ')}</span>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Consultation Fee: ${doctor.consultationFee}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link
                    to={`/doctor/${doctor.id}`}
                    className="flex-1 btn-secondary text-center"
                  >
                    View Profile
                  </Link>
                  <Link
                    to={`/book/${doctor.id}`}
                    className="flex-1 btn-primary text-center"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredDoctors.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or browse all specialties</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard