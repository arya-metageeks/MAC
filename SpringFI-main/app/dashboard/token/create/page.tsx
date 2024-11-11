import React from 'react'
import CreateTokenSection from './components/CreateTokenSection'
import GradientBorderContainer from '@/components/GradientBorderContainer'

const page = () => {
  return (
    <div>
        <GradientBorderContainer heading='Create Token'>
        <CreateTokenSection/>
        </GradientBorderContainer>
    </div>
  )
}

export default page