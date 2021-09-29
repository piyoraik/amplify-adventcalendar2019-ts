import API, { GraphQLResult } from '@aws-amplify/api'
import { graphqlOperation } from 'aws-amplify'
import React, { ReactElement, useReducer, useEffect } from 'react'
import { CognitoUserInterface } from '@aws-amplify/ui-components'
import {
  ListTodosQuery,
  ListTodosSortedByUpdatedAtQuery,
  ListTodosSortedByUpdatedAtQueryVariables,
} from '../API'
import { listTodosSortedByUpdatedAt } from '../graphql/queries'

interface Props {
  currentUser: CognitoUserInterface
}

interface IAction {
  type: 'QUERY' | 'SUBSCRIPTION'
  todos: ListTodosQuery
}

const initialState = {
  todos: [],
}

const reducer = (state: { todos: any }, action: IAction) => {
  switch (action.type) {
    case 'QUERY':
      return { ...state, todos: action.todos }
    case 'SUBSCRIPTION':
      return { ...state, todos: [action.todos, ...state.todos] }
    default:
      return state
  }
}

export default function List({ currentUser }: Props): ReactElement {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    async function getData() {
      try {
        const todoData = (await API.graphql(
          graphqlOperation(listTodosSortedByUpdatedAt, {
            owner: currentUser.username,
            sortDirection: 'DESC',
          } as ListTodosSortedByUpdatedAtQueryVariables)
        )) as GraphQLResult<ListTodosSortedByUpdatedAtQuery>

        dispatch({
          type: 'QUERY',
          todos: todoData.data?.listTodosSortedByUpdatedAt
            ?.items as ListTodosQuery,
        })
      } catch (err) {
        console.error(err)
      }
    }
    getData()
  }, [currentUser.username])

  console.log(state)

  return <div>sds</div>
}
