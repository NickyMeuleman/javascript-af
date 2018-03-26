import React from 'react'
import Sidebar, { NavIcon } from './styles/Sidebar'
import HomeIcon from '../assets/icons/home'
import SearchIcon from '../assets/icons/search'
import ChatIcon from '../assets/icons/chat'
import AccountIcon from '../assets/icons/account'
import styled from 'styled-components'

const Logo = styled.div`
  display: flex;
  justify-content: center;
  padding: 20% 0 20% 0;
  & > img {
    height: 40px;
    width: 40px;
  }
  @media all and (max-width: 570px) {
    display: none;
  }
`

class Sidemenu extends React.Component {
  render () {
    return (
      <Sidebar>
        <Logo>
          <img src="/static/logo.png" alt="" />
        </Logo>
        <NavIcon href="/home" active={this.props.pathname === '/home'}>
          <HomeIcon />
        </NavIcon>
        <NavIcon href="/search" active={this.props.pathname === '/search'}>
          <SearchIcon />
        </NavIcon>
        <NavIcon href="/social" active={this.props.pathname === '/social'}>
          <ChatIcon />
        </NavIcon>
        <NavIcon href="/profile" active={this.props.pathname === '/profile'}>
          <AccountIcon />
        </NavIcon>
      </Sidebar>
    )
  }
}

export default Sidemenu