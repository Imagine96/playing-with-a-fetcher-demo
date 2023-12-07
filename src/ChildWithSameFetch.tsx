import { useFetcher } from "./lib/fetcher"
import { pokeFetcher } from "./lib/fetchersSamples"

const ChildWithSameFetch = () => {

  const { data, error, isLoading } = useFetcher<unknown>('/ditto', pokeFetcher)
  console.log(error, isLoading)
  return (
    <div>{JSON.stringify(data)}</div>
  )
}

export default ChildWithSameFetch