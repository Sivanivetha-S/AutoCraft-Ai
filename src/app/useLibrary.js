import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'craftflow_library'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function save(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {}
}

export function useLibrary() {
  const [items, setItems] = useState(load)

  // Persist every change
  useEffect(() => { save(items) }, [items])

  const addProject = useCallback((craft, uploadedImages) => {
    const project = {
      id: `proj_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      craftId: craft.id,
      title: craft.title,
      category: craft.category,
      difficulty: craft.difficulty,
      time: craft.time,
      skill: craft.skill,
      cost: craft.cost,
      sustainability: craft.sustainability,
      emoji: craft.emoji,
      color: craft.color,
      materials: craft.additionalMaterials || [],
      steps: craft.steps || [],
      safetyTips: craft.safetyTips || [],
      environmentalImpact: craft.environmentalImpact || '',
      description: craft.description || '',
      uploadedImages: uploadedImages.map(img => ({ name: img.name, preview: img.preview })),
      savedAt: new Date().toISOString(),
      completionStatus: 'Not Started', // Not Started | In Progress | Completed
      notes: '',
      favorite: false,
      tags: [craft.category, craft.difficulty],
    }
    setItems(prev => [project, ...prev])
    return project.id
  }, [])

  const removeProject = useCallback((id) => {
    setItems(prev => prev.filter(p => p.id !== id))
  }, [])

  const toggleFavorite = useCallback((id) => {
    setItems(prev => prev.map(p => p.id === id ? { ...p, favorite: !p.favorite } : p))
  }, [])

  const updateProject = useCallback((id, patch) => {
    setItems(prev => prev.map(p => p.id === id ? { ...p, ...patch } : p))
  }, [])

  const getProject = useCallback((id) => {
    return items.find(p => p.id === id) || null
  }, [items])

  return { items, addProject, removeProject, toggleFavorite, updateProject, getProject }
}
