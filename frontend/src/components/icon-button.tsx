import { ComponentProps } from 'react'

type Props = ComponentProps<'button'>

export const IconButton = (props: Props) => (
  <button
    className="p-1.5 bg-gray-500 text-blue rounded-md cursor-pointer transition-colors duration-300 hover:bg-blue hover:text-gray-900"
    {...props}
  />
)
