import * as React from 'react';
import { ButtonHTMLAttributes, FC } from 'react'
import cn from './style.module.scss';

interface Props {
  variant?: 'rounded' | 'disabled' | 'outline' | 'contain' | 'undefained'
  gradient?: 'gred' | 'gblue' | 'undefained'
  color?: 'red' | 'blue' | 'white' | 'undefained'
  border?: 'bnone' | 'undefained'
}

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement> & Props> = ({children, border, type = 'button', color = 'blue', gradient, variant = 'outline', ...props}) => {
  return <button type={type} className={`${cn[border]} ${cn[variant]} ${cn[gradient]} ${cn[color]}`} {...props}>{children}</button>
}

export default Button