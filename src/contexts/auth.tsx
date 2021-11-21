import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState
} from 'react'
import {
  getAuth,
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut as signOutFirebase
} from 'firebase/auth'

import firebaseApp from '../services/firebase'

export type AuthContextData = {
  user: User | null,
  signUp: (email: string, password: string) => Promise<void>,
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined)

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContextProvider = (props: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(firebaseApp), (newUser) => {
      setUser(newUser)
    })

    return () => unsubscribe()
  }, [getAuth, firebaseApp])

  const signUp = useCallback(async (email: string, password: string) => {
    const result = await createUserWithEmailAndPassword(
      getAuth(firebaseApp),
      email,
      password
    )
    if (result.user) {
      setUser(result.user)
    }
  }, [getAuth, firebaseApp])

  const signOut = useCallback(async () => {
    await signOutFirebase(getAuth(firebaseApp))
  }, [signOutFirebase, getAuth, firebaseApp])

  if (user === undefined) {
    return null
  }

  return (
    <AuthContext.Provider value={{ user, signUp, signOut }}>
      {props.children}
    </AuthContext.Provider>
  )
}
