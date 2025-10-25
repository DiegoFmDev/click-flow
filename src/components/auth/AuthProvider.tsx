import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string 
  email: string
  name: string
}

interface AuthContextType{
  user: User | null
  loading: boolean
  signOut: () => void
  signIn: (email: string, password: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Credenciales de prueba
const DEMO_CREDENTIALS = {
  email: 'admin@admin.com',
  password: "admin123"
}

export function AuthProvider({children}: {children: React.ReactNode}){
  const[user, setUser] = useState<User | null>(null)
  const[loading, setLoading] = useState(true)

  useEffect(() =>{
    const savedUser = localStorage.getItem('clickflow_user')
    if(savedUser){
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  },[])

  const signIn = (email: string, password: string) =>{
    if(email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password){
      const userData: User = {
        id: '1',
        email: DEMO_CREDENTIALS.email,
        name: 'Admin user'
      }
      setUser(userData)
      localStorage.setItem('clickflow_user', JSON.stringify(userData))
      return true
    }
    return false
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('clickflow_user')
  }

  return (
    <AuthContext.Provider value= {{user, loading, signOut, signIn}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider')
  }

  return context
}
