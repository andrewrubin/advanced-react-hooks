// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

const CountContext = React.createContext();

function CountProvider({...props}) {
  const [ count, setCount ] = React.useState(0);
  const value = {count, setCount};
  return <CountContext.Provider value={value} {...props} />
}

function useCount() {
  if (!React.useContext(CountContext)) {
    throw new Error(`useCount must be used from within a Context Provider.`);
  }
  return React.useContext(CountContext);
}

function CountDisplay() {
  const {count} = useCount();
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  const {setCount} = useCount();
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}

export default App
