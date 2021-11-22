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
  user: User,
  idToken: string
}

export type AuthContextData = {
  credentials: UserCredentials | null,
  signUp: (email: string, password: string) => Promise<void>,
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined)

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContextProvider = (props: AuthContextProviderProps) => {
  const [credentials, setCredentials] = useState<UserCredentials | null>()

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(getAuth(firebaseApp), async (newUser) => {
      if (!newUser) {
        unsubscribe()
      }
      await updateCredentials(newUser)
    }, (err) => console.log(err))

    return () => unsubscribe()
  }, [firebaseApp, getAuth])

  const signUp = useCallback(async (email: string, password: string) => {
    const result = await createUserWithEmailAndPassword(
      getAuth(firebaseApp),
      email,
      password
    )
    await updateCredentials(result.user)
  }, [firebaseApp, getAuth])

  const signOut = useCallback(async () => {
    await signOutFirebase(getAuth(firebaseApp))
    await updateCredentials(null)
  }, [signOutFirebase, getAuth, firebaseApp])

  async function updateCredentials (newUser: User | null) {
    if (!newUser) {
      setCredentials(null)
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
