import { useState } from 'react'
import './App.css'
import VideoUpload from './components/VideoUpload'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='flex flex-col items-center space-y-5 justify-center py-9'>
        <h1 className='text-3xl font-bold text-gray-700 dark:text-gray-100'>Video Streaming app</h1>

        <VideoUpload />
      </div>
    </>
  )
}

export default App
