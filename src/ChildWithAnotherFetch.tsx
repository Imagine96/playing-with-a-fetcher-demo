import { pokeFetcher } from "./lib/fetchersSamples"
import { useFetcher } from "./lib/fetcher"

const ChildWithAnotherFetch = () => {

  const { data, error, isLoading } = useFetcher<unknown>('/charmander', pokeFetcher)
  console.log(error, isLoading)
  return (
    <div style={{
      backgroundColor: 'tomato'
    }} >{JSON.stringify(data)}</div>
  )
}

export default ChildWithAnotherFetch