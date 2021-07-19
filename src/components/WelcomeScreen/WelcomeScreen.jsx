import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Clouds from 'vanta/dist/vanta.clouds.min'
import * as THREE from 'three'

const WelcomeScreen = ( { children }) => {
  const myRefDiv = useRef(null)
  const [vanta, setVanta] = useState(0)

  console.log('myRefDiv.current', myRefDiv.current)

  useEffect(() => {
    console.log('myRefDiv.current (en UseEffect)', myRefDiv.current)

    if (!vanta) {
      setVanta(Clouds({
        THREE,
        el: myRefDiv.current
      }))
      console.log('Establezco vanta a un valor diferente de 0')
    }

    return () => {
      if (vanta) {
        vanta.destroy()
        console.log('Libero los recursos')
      }
    }
  }, [vanta])

  return (
    <div className="full" ref={myRefDiv}>
      {children}
    </div>
  )
}

WelcomeScreen.propTypes = {
  children: PropTypes.node,
}

export default WelcomeScreen
