import React, { useState, useEffect } from 'react'
import { Container } from '@material-ui/core'

import {
  AuthState,
  onAuthUIStateChange,
  CognitoUserInterface,
} from '@aws-amplify/ui-components'

import Login from './components/Login'
import List from './components/List'

function App() {
  const [authState, setAuthState] = useState<AuthState>()
  const [currentUser, setCurrentUser] = useState<
    CognitoUserInterface | undefined
  >()

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState)
      setCurrentUser(authData as CognitoUserInterface)
    })
  }, [])

  return (
    <Container maxWidth="md">
      {authState === AuthState.SignedIn && currentUser ? (
        <List currentUser={currentUser} />
      ) : (
        <Login />
      )}
    </Container>
  )
}

export default App
