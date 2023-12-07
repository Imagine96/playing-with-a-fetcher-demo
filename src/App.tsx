import { useFetcher } from "./lib/fetcher"
import { pokeFetcher } from "./lib/fetchersSamples"
import ChildWithSameFetch from "./ChildWithSameFetch"
import ChildWithAnotherFetch from "./ChildWithAnotherFetch"

function App() {

  const { data, error, isLoading } = useFetcher<unknown>('/ditto', pokeFetcher)
  if (error) return <> Error </>
  if (data) return (
    <>
      <ChildWithSameFetch />
      <ChildWithAnotherFetch />
      <strong>
        {JSON.stringify(data)}
      </strong>
    </>
  )
  if (isLoading) return <> Loading </>
  return (
    <>
      App
    </>
  )
}

export default App
