import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { windowBoundsAtom } from 'State'

export const useResizeBounds = () => {
  const setWindow = useSetRecoilState(windowBoundsAtom)
  useEffect(() => {
    const updateBounds = () => {
      setWindow({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    updateBounds()
    window.addEventListener('resize', updateBounds)
    return () => window.removeEventListener('resize', updateBounds)
  }, [])
}
