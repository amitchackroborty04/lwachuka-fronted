import React from 'react'
import { ContactHeroBanner } from './_components/ContactHeroBanner'
import { GetInTouchSection } from './_components/GetInTouchSection'
import { ContactInformationSection } from './_components/ContactInformationSection'

const page = () => {
  return (
    <div>
      <ContactHeroBanner/>
      <GetInTouchSection/>
      <ContactInformationSection/>
    </div>
  )
}

export default page
