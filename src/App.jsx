import { useState } from 'react'
import './App.css'
import SideBar from './components/SideBar'

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('es')

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang)
  }


  return (
    <>
    <SideBar selectedLanguage={selectedLanguage} handleLanguageChange={handleLanguageChange} />
    <main>
      <img src="./goblin-decoration.png" alt="" />
    </main>
    </>
  )
}

export default App
