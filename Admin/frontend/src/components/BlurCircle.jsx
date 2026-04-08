import React from 'react'

const BlurCircle = ({top = "auto" , left = "auto" , right = "auto", bottom = "auto"}) => {
  return (
    <div className='absolute -z-20 h-20 w-20 aspect-square rounded-full bg-primary/80 blur-3xl' 
    style={{top:top, left:left, right:right, bottom:bottom}}>
      
    </div>
  )
}

export default BlurCircle
