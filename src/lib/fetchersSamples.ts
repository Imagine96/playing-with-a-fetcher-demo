export const pokeFetcher = async (endpoint: string) => {
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon${endpoint}`)
  if (!resp.ok) {
    throw new Error(resp.statusText)
  }
  const data = await resp.json()
  return data
}