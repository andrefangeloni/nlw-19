import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentProps<'button'>

export const IconButton = ({ className, ...props }: Props) => (
  <button
    className={twMerge(
      'p-1.5 bg-gray-500 text-blue rounded-md cursor-pointer transition-colors duration-300 hover:bg-blue hover:text-gray-900',
      className,
    )}
    {...props}
  />
)
