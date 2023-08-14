import * as React from 'react';
import { ButtonHTMLAttributes, FC } from 'react'
import cn from './style.module.scss';

interface Props {
  variant?: 'up' | 'doubleup' | 'down' | 'doubledown' | 'delete' | 'edit'
}

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement> & Props> = ({children, variant}) => {
  return <button type="button" className={`${cn[variant]} ${cn[gradient]} ${cn[color]}`} >
    {children}
    </button>
}

export default Button