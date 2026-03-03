import React from 'react'
import { AboutusBanner } from './_components/AboutusBanner'
import { WhyChoosePlatform } from '@/components/Home/WhyChoosePlatform'
import { DreamHomeCTA } from '@/components/Home/DreamHomeCTA'
import { AboutUsSection } from './_components/AboutUsSection'
import { FaqSection } from '@/components/common/FaqSection'

const page = () => {
  return (
    <div>
      <AboutusBanner/>
      <AboutUsSection/>
      <WhyChoosePlatform/>
      <DreamHomeCTA/>
      <FaqSection/>
    </div>
  )
}

export default page
