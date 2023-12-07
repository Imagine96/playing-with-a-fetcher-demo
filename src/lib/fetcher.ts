/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useEffect, useState } from "react"

interface Item<T> {
  data?: T
  revalidate: boolean
}

type Fetcher<T> = (...args: any[]) => Promise<T>

const cache = new Map<string, Item<any>>()

export function useFetcher<T>(key: string, fetcher: Fetcher<T>) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<T | undefined>(cache.get(key)?.data)
  const [error, setError] = useState<Error | undefined>()

  const callFetcher = useCallback(() => {
    const cachedValue = cache.get(key)

    if (cachedValue) {
      cachedValue.revalidate = true
      setData(cachedValue.data)
    }
    if (!cachedValue) {
      setIsLoading(true)
    }

    fetcher(key)
      .then((response) => {
        cache.set(key, {
          revalidate: false,
          data: response
        })
        if (JSON.stringify(response) === JSON.stringify(data)) {
          setIsLoading(false)
          setError(undefined)
        } else {
          setData(response)
          setError(undefined)
          setIsLoading(false)
        }
      })
      .catch(err => {
        cache.delete(key)
        setError(err)
        setData(undefined)
        setIsLoading(false)
      })
  }, [data, fetcher, key])

  useEffect(() => {
    callFetcher()
  }, [callFetcher])

  return {
    isLoading,
    data,
    error
  }
}




























/* 
function createFetcher(host, opts) {
  return function fetcher(path) {
    fetch(host + path, opts)
  }
}

const fetcher = createFetcher('https://pokeaipi.com', {

})

function Component() {
  const { data } = useSWR('/pokemon', fetcher)
}
*/


