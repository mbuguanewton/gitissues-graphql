import * as types from '../types'
import { GraphQLClient, gql } from 'graphql-request'

const config = {
  //   Accept: 'application/vnd.github.v3+json',
  authorization: `Bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
}

const baseURL = 'https://api.github.com/graphql'

const client = new GraphQLClient(baseURL)

export function fetchUser(username) {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.FETCH_GITHUB_USER_REQUEST,
      })

      const variables = {
        name: username,
      }

      const userQuery = gql`
        query($name: String!) {
          repositoryOwner(login: $name) {
            login
            avatarUrl
            ... on User {
              gists {
                totalCount
              }
              followers {
                totalCount
              }
              bio
              websiteUrl
              url
            }
            repositories(first: 15) {
              totalCount
            }
          }
        }
      `

      const { repositoryOwner } = await client.request(
        userQuery,
        variables,
        config
      )

      dispatch({
        type: types.FETCH_GITHUB_USER,
        payload: repositoryOwner,
      })
    } catch (error) {
      dispatch({
        type: types.FETCH_GITHUB_USER_FAIL,
        payload: 'User not found!!',
      })
    }
  }
}

export function fetchRepos(owner) {
  return async (dispatch) => {
    try {
      const variables = {
        name: owner,
      }

      const repoQuery = gql`
        query($name: String!) {
          repositoryOwner(login: $name) {
            repositories(
              first: 20
              orderBy: { field: CREATED_AT, direction: DESC }
            ) {
              edges {
                node {
                  id
                  name
                  url
                  description
                  isPrivate
                  languages(first: 5) {
                    edges {
                      node {
                        id
                        name
                      }
                    }
                  }
                  owner {
                    avatarUrl
                    login
                    url
                  }
                }
              }
            }
          }
        }
      `

      const { repositoryOwner } = await client.request(
        repoQuery,
        variables,
        config
      )

      dispatch({
        type: types.FETCH_REPOS,
        payload: repositoryOwner.repositories.edges,
      })
    } catch (error) {
      dispatch({
        type: types.FETCH_REPOS_FAIL,
        payload: error.message,
      })
    }
  }
}

export function fetchIssues(owner, repo) {
  return async (dispatch) => {
    try {
      const variables = {
        name: owner,
        repoName: repo,
      }

      const issueQuery = gql`
        query($name: String!, $repoName: String!) {
          repositoryOwner(login: $name) {
            repository(name: $repoName) {
              issues(first: 10) {
                edges {
                  node {
                    id
                    title
                    state
                    author {
                      login
                      avatarUrl
                    }
                  }
                }
              }
            }
          }
        }
      `

      const { repositoryOwner } = await client.request(
        issueQuery,
        variables,
        config
      )

      dispatch({
        type: types.FETCH_ISSUES,
        payload: repositoryOwner.repository.issues.edges,
      })
    } catch (error) {
      dispatch({
        type: types.FETCH_REPOS_FAIL,
        payload: error.message,
      })
    }
  }
}

export function createIssue(issueInput) {
  return async (dispatch) => {
    try {
      const variables = {
        input: issueInput,
      }

      const mutationQuery = gql`
        mutation($input: CreateIssueInput!) {
          createIssue(input: $input) {
            issue {
              id
              title
              state
              author {
                avatarUrl
                login
              }
            }
          }
        }
      `

      const data = await client.request(mutationQuery, variables, config)
      const newIssue = { node: { ...data.createIssue.issue } }

      dispatch({
        type: types.CREATE_ISSUE,
        payload: newIssue,
      })
    } catch (error) {
      dispatch({
        type: types.CREATE_ISSUE_FAIL,
        payload: error.message,
      })
    }
  }
}
