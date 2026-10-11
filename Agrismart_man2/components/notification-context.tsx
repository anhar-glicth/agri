"use client"

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react"

interface Notification {
  id: number
  message: string
  time: string
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (message: string) => void
  removeNotification: (id: number) => void
  clearNotifications: () => void
}

const NotificationContext =
  createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({
  children,
}: {
  children: ReactNode
}) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (message: string) => {
    const newNotification: Notification = {
      id: Date.now(),
      message,
      time: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    setNotifications((prev) => [
      newNotification,
      ...prev,
    ])
  }

  const removeNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((item) => item.id !== id)
    )
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)

  if (!context) {
    throw new Error(
      "useNotifications harus digunakan di dalam NotificationProvider"
    )
  }

  return context
}