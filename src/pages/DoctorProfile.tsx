import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, MapPin, Clock, Calendar, Award, Users, ArrowLeft } from 'lucide-react'

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
  about: string
  education: string[]
  certifications: string[]
  languages: string[]
  totalPatients: number
}

const DoctorProfile = () => {
  const { id } = useParams<{ id: string }>()
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDoctor = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock doctor data
      const mockDoctor: Doctor = {
        id: id || '1',
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiology',
        rating: 4.9,
        experience: 12,
        location: 'New York, NY',
        avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
        availability: ['Morning', 'Afternoon'],
        consultationFee: 150,
        about: 'Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience in treating cardiovascular diseases. She specializes in preventive cardiology, heart failure management, and interventional procedures. Dr. Johnson is committed to providing personalized care and educating patients about heart health.',
        education: [
          'MD - Harvard Medical School',
          'Residency - Johns Hopkins Hospital',
          'Fellowship - Mayo Clinic'
        ],
        certifications: [
          'Board Certified in Cardiology',
          'Board Certified in Internal Medicine',
          'Advanced Cardiac Life Support (ACLS)'
        ],
        languages: ['English', 'Spanish'],
        totalPatients: 2500
      }
      
      setDoctor(mockDoctor)
      setIsLoading(false)
    }

    fetchDoctor()
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="card mb-8">
              <div className="flex items-center mb-6">
                <div className="w-32 h-32 bg-gray-300 rounded-full mr-6"></div>
                <div className="flex-1">
                  <div className="h-8 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Doctor not found</h2>
          <Link to="/dashboard" className="btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/dashboard"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>

        {/* Doctor Header */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center mb-6">
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
              <p className="text-xl text-primary-600 font-medium mb-4">{doctor.specialty}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-2 fill-current" />
                  <span className="font-medium">{doctor.rating}</span>
                  <span className="ml-1">rating</span>
                </div>
                
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  <span>{doctor.experience} years experience</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{doctor.location}</span>
                </div>
                
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{doctor.totalPatients}+ patients treated</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 md:ml-6">
              <div className="text-right mb-4">
                <p className="text-2xl font-bold text-gray-900">${doctor.consultationFee}</p>
                <p className="text-sm text-gray-600">Consultation Fee</p>
              </div>
              <Link
                to={`/book/${doctor.id}`}
                className="btn-primary w-full md:w-auto"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About Dr. {doctor.name.split(' ')[1]}</h2>
              <p className="text-gray-600 leading-relaxed">{doctor.about}</p>
            </div>

            {/* Education */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
              <ul className="space-y-2">
                {doctor.education.map((edu, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-600">{edu}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certifications */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Certifications</h2>
              <ul className="space-y-2">
                {doctor.certifications.map((cert, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-600">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Availability */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability</h3>
              <div className="space-y-3">
                {doctor.availability.map((time, index) => (
                  <div key={index} className="flex items-center">
                    <Clock className="w-4 h-4 text-primary-600 mr-2" />
                    <span className="text-gray-600">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {doctor.languages.map((language, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to={`/book/${doctor.id}`}
                  className="w-full btn-primary text-center flex items-center justify-center"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Link>
                <button className="w-full btn-secondary">
                  Save to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile