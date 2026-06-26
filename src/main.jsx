import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// Landing page
import App from './App.jsx'

// App shell
import { AppProvider } from './app/AppContext.jsx'
import AppLayout from './app/AppLayout.jsx'

// App pages
import AppDashboard from './app/pages/AppDashboard.jsx'
import UploadPage from './app/pages/UploadPage.jsx'
import ProcessingPage from './app/pages/ProcessingPage.jsx'
import ResultsPage from './app/pages/ResultsPage.jsx'
import LibraryPage from './app/pages/LibraryPage.jsx'
import ProjectDetails from './app/pages/ProjectDetails.jsx'
import FavoritesPage from './app/pages/FavoritesPage.jsx'
import RecentPage from './app/pages/RecentPage.jsx'
import SettingsPage from './app/pages/SettingsPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<App />} />

          {/* App — all children share sidebar layout */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<AppDashboard />} />
            <Route path="generate" element={<UploadPage />} />
            <Route path="processing" element={<ProcessingPage />} />
            <Route path="results" element={<ResultsPage />} />
            <Route path="library" element={<LibraryPage />} />
            <Route path="project/:id" element={<ProjectDetails />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="recent" element={<RecentPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  </StrictMode>,
)
