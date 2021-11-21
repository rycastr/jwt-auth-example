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
  onIdTokenChanged,
  signOut as signOutFirebase,
  getIdToken
} from 'firebase/auth'

import firebaseApp from '../services/firebase'

export type UserCredentials = {
  user: User | null,
  idToken?: string
}

export type AuthContextData = {
  credentials: UserCredentials,
  signUp: (email: string, password: string) => Promise<void>,
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined)

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContextProvider = (props: AuthContextProviderProps) => {
  const [credentials, setCredentials] = useState<UserCredentials>()

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(getAuth(firebaseApp), updateCredentials)

    return () => unsubscribe()
  }, [getAuth, firebaseApp])

  const signUp = useCallback(async (email: string, password: string) => {
    const result = await createUserWithEmailAndPassword(
      getAuth(firebaseApp),
      email,
      password
    )
    updateCredentials(result.user)
  }, [getAuth, firebaseApp])

  const signOut = useCallback(async () => {
    await signOutFirebase(getAuth(firebaseApp))
  }, [signOutFirebase, getAuth, firebaseApp])

  async function updateCredentials (newUser: User | null) {
    if (!newUser) {
      setCredentials({
        user: newUser,
        idToken: undefined
      })
    } else {
      try {
        const newIdToken = await getIdToken(newUser)
        setCredentials({
          user: newUser,
          idToken: newIdToken
        })
      } catch (err) {
        console.log(err)
      }
    }
  }

  if (credentials === undefined) {
    return null
  }

  return (
    <AuthContext.Provider value={{ credentials, signUp, signOut }}>
      {props.children}
    </AuthContext.Provider>
  )
}
