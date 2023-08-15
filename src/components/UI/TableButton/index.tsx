import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import * as React from 'react';
import { ButtonHTMLAttributes, FC } from 'react'
import { FiTrash2, FiEdit, FiChevronDown, FiChevronUp, FiChevronsDown, FiChevronsUp, FiCheckCircle } from 'react-icons/fi'
import cn from './style.module.scss';

interface Props {
  variant?: 'up' | 'doubleup' | 'down' | 'doubledown' | 'delete' | 'edit' | 'check'
}

const TableButton: FC<ButtonHTMLAttributes<HTMLButtonElement> & Props> = ({ variant, ...props }) => {
  let icon: ReactJSXElement
  switch (variant) {
    case 'up': icon = <FiChevronUp /> 
      break
    case 'down': icon = <FiChevronDown />
      break
    case 'doubleup': icon = <FiChevronsUp />
      break
    case 'doubledown': icon = <FiChevronsDown />
      break
    case 'delete': icon = <FiTrash2 />
      break
    case 'edit': icon = <FiEdit />
      break
    case 'check': icon = <FiCheckCircle />
      break
  }
  return <button type="button" className={`${cn[variant]} ${cn.btnTable}`} {...props} >
    {icon}
    </button>
}

export default TableButton