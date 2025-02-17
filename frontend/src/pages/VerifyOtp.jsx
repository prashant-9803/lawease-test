"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast, Toaster } from 'sonner'

export default function VerifyOtp() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef([])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (element, index) => {
    // Check if the entered value is a number
    if (isNaN(Number(element.value))) return

    // Update the OTP state
    const newOtp = [...otp]
    newOtp[index] = element.value
    setOtp(newOtp)

    // Focus next input if value is entered
    if (element.value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus()
    } else if (element.value === '') {
      // If the current input is cleared, focus on the previous input
      if (index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text')
    const pastedOtp = pastedData.slice(0, 6).split('')

    if (pastedOtp.length === 6 && pastedOtp.every(char => !isNaN(Number(char)))) {
      setOtp(pastedOtp)
      inputRefs.current[5]?.focus()
    } else {
      toast.error('Please paste a valid 6-digit OTP')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const enteredOtp = otp.join('')
    if (enteredOtp.length === 6) {
      // Here you would typically send the OTP to your backend for verification
      console.log('Submitting OTP:', enteredOtp)
      toast.success('OTP submitted successfully!')
    } else {
      toast.error('Please enter a complete 6-digit OTP')
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Enter OTP
          </CardTitle>
          <CardDescription className="text-center">
            We've sent a 6-digit code to your email. Please enter it below or paste the entire code.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between max-w-xs mx-auto">
              {otp.map((data, index) => (
                <Input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  ref={el => inputRefs.current[index] = el}
                  value={data}
                  onChange={e => handleChange(e.target, index)}
                  onFocus={e => e.target.select()}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-12 text-center text-2xl"
                />
              ))}
            </div>
            <Button className="w-full" type="submit">
              Verify OTP
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Button variant="link" onClick={() => toast.info('New OTP sent!')}>
              Resend OTP
            </Button>
          </div>
        </CardContent>
      </Card>
      <Toaster position="bottom-center" />
    </div>
  )
}
