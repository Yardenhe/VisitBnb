import { useState, useEffect, useRef } from 'react';

const useClickOutside = (initialState) => {
  const [isOpen, setIsOpen] = useState(initialState)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return { isOpen, ref, setIsOpen }
}

export default useClickOutside;
