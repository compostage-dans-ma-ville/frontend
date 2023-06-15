import { useState, useEffect } from 'react'

export interface WindowDimension {
  width: number
  height: number
}

const getWindowDimensions = (): WindowDimension => {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height
  }
}

export const useWindowDimensions = (): WindowDimension => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    const handleResize = (): void => {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return (): void => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}
