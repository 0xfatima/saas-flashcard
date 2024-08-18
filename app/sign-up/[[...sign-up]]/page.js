import SignPage from '@/app/components/signPage'
import { SignUp } from '@clerk/nextjs'
import React from 'react'

export default function SignUpPage() {
  return (
    <>
     <SignPage component={<SignUp/>} />
    </>
  )
}
