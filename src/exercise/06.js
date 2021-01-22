// useDebugValue: useMedia
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

// useDebugValue can take a "format" function which basically takes its first param and passes it through some logic to return a new value. This is only needed if the value is computationally-expensive. It will no longer calculate on every render. I think this is similar to a lazy initializer, but for DevTools :)
const formatDebugValue = ({query, state}) => `query: ${query}!!, state: ${state}!!!`;

function useMedia(query, initialState = false) {
  const [state, setState] = React.useState(initialState)
  // React.useDebugValue(`'${query}': ${state}`)
  React.useDebugValue({query, state}, formatDebugValue);

  React.useEffect(() => {
    let mounted = true
    const mql = window.matchMedia(query)
    function onChange() {
      if (!mounted) {
        return
      }
      setState(Boolean(mql.matches))
    }

    mql.addListener(onChange)
    setState(mql.matches)

    return () => {
      mounted = false
      mql.removeListener(onChange)
    }
  }, [query])

  return state
}

function Box() {
  const isBig = useMedia('(min-width: 1000px)')
  const isMedium = useMedia('(max-width: 999px) and (min-width: 700px)')
  const isSmall = useMedia('(max-width: 699px)')
  const color = isBig ? 'green' : isMedium ? 'yellow' : isSmall ? 'red' : null

  return <div style={{width: 200, height: 200, backgroundColor: color}} />
}

function App() {
  return <Box />
}

export default App
