import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import Layout from '../components/UserLayout'
import GitIcon from '../assets/icons/github'
import { InvertedButton, LinkBtn } from '../components/Button'
import styled from 'styled-components'
import gql from 'graphql-tag'
import Head from 'next/head'
import withData from '../apollo/wihData'
import withAuth from '../components/withAuth'
import { Sparklines, SparklinesLine } from 'react-sparklines'

const query = gql`
  query getRepo($id: ID!) {
    getRepo(id: $id) {
      description
      readme
      url
      name
      nameWithOwner
      activity
      starCount
      posted
      pushedAt
    }
  }
`

const Card = styled.div`
  padding: 1rem;
  background: #fff;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 75% 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'heading heading'
    'readme extras';
  @media all and (max-width: 1024px) {
    grid-template-columns: 65% 1fr;
  }
  @media all and (max-width: 790px) {
    display: flex;
    flex-direction: column;
  }
`

const Description = styled.p`
  color: ${props => props.theme.secondary};
  font-size: 24px;
  font-family: Roboto;
  grid-area: heading;
`

const ReadmeArea = styled.div`
  grid-area: readme;
`

const ExtrasArea = styled.div`
  grid-area: extras;
  padding: 1.5rem 0.7rem 0.7rem 0.7rem;
  border-left: 1px solid #cbcbcb;
  @media all and (max-width: 790px) {
    border-left: none;
    border-top: 1px solid #cbcbcb;
    padding: 0.7rem;
    margin-top: 0.7rem;
  }
`

const GitBtn = LinkBtn.extend`
  width: 100%;
  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  word-break: break-all;
`
const InvBtn = InvertedButton.extend`
  width: 100%;
  text-align: center;
`
const BtnContainer = styled.div`
  width: 100%;
  margin: 1rem 0rem;
  display: flex;
`
const SideContainer = styled.div`
  margin: 0.5rem 0;
  border-bottom: 1px solid #cbcbcb;
  h2 i {
    font-size: 1rem;
  }
`

export default withData(
  withAuth(
    class RepoDetailsTemplate extends Component {
      static getInitialProps = ({ query }) => {
        return { query }
      }
      render() {
        return (
          <Fragment>
            <Head>
              <link rel="stylesheet" href="/static/gfm.css" />
            </Head>
            <Query
              query={query}
              variables={{
                id: this.props.query.id
              }}
            >
              {({ data, loading, error }) => {
                if (loading) {
                  return <Layout title="Loading">Loading...</Layout>
                }
                if (error) {
                  return <Layout title="Error">Error...</Layout>
                }
                let {
                  getRepo: { description, readme, name, url, nameWithOwner, activity, starCount, posted, pushedAt }
                } = data
                if (!readme) {
                  readme = `
                <i>(No readme found on github. Add one on github)</i>
              `
                }
                return (
                  <Layout title={name}>
                    <Card>
                      <Description>{description}</Description>
                      <ReadmeArea className="markdown-body" dangerouslySetInnerHTML={{ __html: readme }} />
                      <ExtrasArea>
                        <SideContainer>
                          <BtnContainer>
                            <GitBtn href={url} target="_blank" rel="noopener">
                              <GitIcon style={{ fill: '#fff', height: 'auto', width: '1.7rem' }} />&nbsp;{' '}
                              {nameWithOwner}
                            </GitBtn>
                          </BtnContainer>
                          <BtnContainer>
                            <InvBtn href={url} target="_blank" rel="noopener">
                              Visit
                            </InvBtn>
                          </BtnContainer>
                        </SideContainer>
                        <SideContainer>
                          <h2>
                            Activity <i>(Past 1 year)</i>
                          </h2>
                          <a href={`${url}/graphs/commit-activity`} target="_blank" rel="noopener">
                            <Sparklines data={activity} height={90}>
                              <SparklinesLine color="#3031b4" />
                            </Sparklines>
                          </a>
                        </SideContainer>
                        <SideContainer>
                          <h3>Github Stars {starCount}</h3>
                          <h3>Posted {posted}</h3>
                          <h3>Last Pushed At {pushedAt}</h3>
                        </SideContainer>
                      </ExtrasArea>
                    </Card>
                  </Layout>
                )
              }}
            </Query>
          </Fragment>
        )
      }
    }
  )
)
