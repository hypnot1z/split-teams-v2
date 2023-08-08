import * as React from 'react';
import { InputHTMLAttributes, FC } from 'react'
import cn from './style.module.scss';

interface InputProps {
  variant?: 'gradient' | 'grey' | ' ' 
}

const Input: FC<InputHTMLAttributes<HTMLInputElement> & InputProps> = ({children, variant = ' ' , ...props}) => {
  return <input className={cn[variant]} {...props}>{children}</input>
}

export default Input