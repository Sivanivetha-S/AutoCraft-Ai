import { createContext, useContext, useState } from 'react'
import { useLibrary } from './useLibrary'

const AppCtx = createContext(null)

export function AppProvider({ children }) {
  const library = useLibrary()
  const [uploadedImages, setUploadedImages] = useState([])
  const [craftResults, setCraftResults] = useState([])
  const [selectedCraft, setSelectedCraft] = useState(null)

  return (
    <AppCtx.Provider value={{
      library,
      uploadedImages, setUploadedImages,
      craftResults, setCraftResults,
      selectedCraft, setSelectedCraft,
    }}>
      {children}
    </AppCtx.Provider>
  )
}

export const useApp = () => useContext(AppCtx)
