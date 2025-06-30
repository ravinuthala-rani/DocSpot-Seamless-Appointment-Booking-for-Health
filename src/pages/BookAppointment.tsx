import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Calendar, Clock, FileText, Upload, ArrowLeft } from 'lucide-react'
import { format, addDays, startOfWeek } from 'date-fns'

interface Doctor {
  id: string
  name: string
  specialty: string
  consultationFee: number
  avatar: string
}

interface TimeSlot {
  time: string
  available: boolean
}

const BookAppointment = () => {
  const { doctorId } = useParams<{ doctorId: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [reason, setReason] = useState<string>('')
  const [documents, setDocuments] = useState<FileList | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const timeSlots: TimeSlot[] = [
    { time: '09:00 AM', available: true },
    { time: '09:30 AM', available: false },
    { time: '10:00 AM', available: true },
    { time: '10:30 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '11:30 AM', available: true },
    { time: '02:00 PM', available: true },
    { time: '02:30 PM', available: true },
    { time: '03:00 PM', available: false },
    { time: '03:30 PM', available: true },
    { time: '04:00 PM', available: true },
    { time: '04:30 PM', available: true },
  ]

  useEffect(() => {
    const fetchDoctor = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockDoctor: Doctor = {
        id: doctorId || '1',
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiology',
        consultationFee: 150,
        avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1'
      }
      
      setDoctor(mockDoctor)
      setIsLoading(false)
    }

    fetchDoctor()
  }, [doctorId])

  const getWeekDays = () => {
    const start = startOfWeek(new Date())
    return Array.from({ length: 7 }, (_, i) => addDays(start, i))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTime || !reason.trim()) {
      alert('Please select a time slot and provide a reason for the appointment.')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert('Appointment booked successfully! You will receive a confirmation email shortly.')
      navigate('/appointments')
    } catch (error) {
      alert('Failed to book appointment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to book an appointment</h2>
          <button onClick={() => navigate('/login')} className="btn-primary">
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="card">
              <div className="h-8 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-32 bg-gray-300 rounded"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-32 bg-gray-300 rounded"></div>
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
          <button onClick={() => navigate('/dashboard')} className="btn-primary">
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="card">
          {/* Header */}
          <div className="flex items-center mb-8 pb-6 border-b border-gray-200">
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{doctor.name}</h1>
              <p className="text-primary-600 font-medium">{doctor.specialty}</p>
              <p className="text-gray-600">Consultation Fee: ${doctor.consultationFee}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Date Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Select Date
                </h3>
                <div className="grid grid-cols-7 gap-2">
                  {getWeekDays().map((date, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedDate(date)}
                      className={`p-3 text-center rounded-lg border transition-colors ${
                        format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="text-xs font-medium">
                        {format(date, 'EEE')}
                      </div>
                      <div className="text-sm">
                        {format(date, 'd')}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Select Time
                </h3>
                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={`p-3 text-sm rounded-lg border transition-colors ${
                        selectedTime === slot.time
                          ? 'bg-primary-600 text-white border-primary-600'
                          : slot.available
                          ? 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                          : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reason for Visit */}
            <div className="mt-8">
              <label htmlFor="reason" className="block text-lg font-semibold text-gray-900 mb-4">
                <FileText className="w-5 h-5 inline mr-2" />
                Reason for Visit
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                className="input-field"
                placeholder="Please describe your symptoms or reason for the appointment..."
                required
              />
            </div>

            {/* Document Upload */}
            <div className="mt-6">
              <label htmlFor="documents" className="block text-lg font-semibold text-gray-900 mb-4">
                <Upload className="w-5 h-5 inline mr-2" />
                Upload Documents (Optional)
              </label>
              <input
                id="documents"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={(e) => setDocuments(e.target.files)}
                className="input-field"
              />
              <p className="text-sm text-gray-600 mt-2">
                You can upload medical records, insurance information, or other relevant documents.
              </p>
            </div>

            {/* Summary */}
            {selectedDate && selectedTime && (
              <div className="mt-8 p-4 bg-primary-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Appointment Summary</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Doctor:</strong> {doctor.name}</p>
                  <p><strong>Date:</strong> {format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
                  <p><strong>Time:</strong> {selectedTime}</p>
                  <p><strong>Consultation Fee:</strong> ${doctor.consultationFee}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || !selectedTime || !reason.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Booking Appointment...' : 'Book Appointment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BookAppointment