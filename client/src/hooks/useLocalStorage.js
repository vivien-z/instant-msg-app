import { useEffect, useState } from 'react'

const PREFIX = 'instant-msg-'

function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key //set prefix to distinguish from other data stored

  const [value, setValue] = useState(() => { // get value from local storage and put into the state.
    const jsonValue = localStorage.getItem(prefixedKey)
    if (jsonValue != null) {
      return JSON.parse(jsonValue) //1. return is value exist
    }

    if (typeof initialValue === 'function') {
      return initialValue() //2. or return if the initialValue is a function
    } else {
      return initialValue //3. or return the default value
    }

  })

  // get value and save to the local storage
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue]
}

export default useLocalStorage;
