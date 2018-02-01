import React from 'react'
import FontAwesome from '@fortawesome/react-fontawesome'
import HomeIcon from '@fortawesome/fontawesome-free-solid/faHome'
import BriefCaseIcon from '@fortawesome/fontawesome-free-solid/faBriefcase'
import CommentsIcon from '@fortawesome/fontawesome-free-solid/faComments'
import SearchIcon from '@fortawesome/fontawesome-free-solid/faSearch'
import UserIcon from '@fortawesome/fontawesome-free-solid/faUser'
import Sidebar from './styles/Sidebar'

const Sidemenu = () => {
  return (
    <Sidebar>
      <a href="/">
        <FontAwesome icon={HomeIcon} />
      </a>
      <a href="/search">
        <FontAwesome icon={SearchIcon} />
      </a>
      <a href="/work">
        <FontAwesome icon={BriefCaseIcon} />
      </a>
      <a href="/social">
        <FontAwesome icon={CommentsIcon} />
      </a>
      <a href="/profile">
        <FontAwesome icon={UserIcon} />
      </a>
    </Sidebar>
  )
}

export default Sidemenu
