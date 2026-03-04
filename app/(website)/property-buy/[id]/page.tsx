import React from 'react'
import { PropertyImageGallery } from '../_components/PropertyImageGallery'
import { PropertyDetailsWithAgentCard } from '../_components/PropertyDetailsWithAgentCard'
import { PropertyExtrasSection } from '../_components/PropertyExtrasSection'
import SimilarProperies from '../_components/SimilarProperies'

const page = () => {
  return (
    <div>
      <PropertyImageGallery/>
      <PropertyDetailsWithAgentCard/>
      <PropertyExtrasSection/>
      <SimilarProperies/>
    </div>
  )
}

export default page
