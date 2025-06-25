import { useState, useCallback } from 'react'

interface ToastProps {
  title: string
  description?: string
  variant?: 'default' | 'destructive'
}

interface Toast extends ToastProps {
  id: string
}

// グローバルなToast状態
let toasts: Toast[] = []
let listeners: Array<(toasts: Toast[]) => void> = []

export const useToast = () => {
  const [, forceUpdate] = useState({})

  const addToast = useCallback((toast: ToastProps) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: Toast = { ...toast, id }
    
    toasts = [...toasts, newToast]
    listeners.forEach(listener => listener(toasts))

    // 5秒後に自動削除
    setTimeout(() => {
      toasts = toasts.filter(t => t.id !== id)
      listeners.forEach(listener => listener(toasts))
    }, 5000)
  }, [])

  const removeToast = useCallback((id: string) => {
    toasts = toasts.filter(t => t.id !== id)
    listeners.forEach(listener => listener(toasts))
  }, [])

  // リスナーの登録/削除
  const subscribe = useCallback((listener: (toasts: Toast[]) => void) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }, [])

  return {
    toast: addToast,
    toasts,
    removeToast,
    subscribe,
  }
}