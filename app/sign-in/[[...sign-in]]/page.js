import { SignIn } from '@clerk/nextjs'
import React from 'react'
import SignPage from '@/app/components/signPage'
export default function SignUpPage() {
  return (
    <>
     <SignPage component={<SignIn/>}/>
    </>
  )
}
