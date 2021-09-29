import React, { ReactElement } from 'react'
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react'

export default function Login(): ReactElement {
  return (
    <>
      <AmplifyAuthenticator>
        <AmplifySignUp
          slot="sign-up"
          formFields={[
            { type: 'username' },
            { type: 'password' },
            { type: 'email' },
          ]}
        />
      </AmplifyAuthenticator>
    </>
  )
}
