import * as React from 'react';
import { FC } from 'react'
import cn from './style.module.scss'
import { Link } from 'react-router-dom'

interface NavButtonProps {
  to?: string
  text: string
}

const NavButton: FC<NavButtonProps> = ({to = '/', text}) => {
  return (
    <Link to={to} >
      <button className={cn.navButton}>{text}</button>
    </Link>
  )
}

export default NavButton