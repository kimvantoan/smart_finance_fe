import { useState } from 'react'
import { Button } from '../shared/components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button variant="destructive" size="lg" onClick={() => setCount((count) => count + 1)}>
        Count is {count}
      </Button>
    </>
  )
}

export default App
