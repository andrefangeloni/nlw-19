import { ComponentProps } from 'react'

type InputRootProps = ComponentProps<'div'> & {
  error?: boolean
}

export const InputRoot = ({ error = false, ...props }: InputRootProps) => (
  <div
    data-error={error}
    className="group bg-gray-800 h-12 border border-gray-600 rounded-xl px-4 flex items-center gap-2 focus-within:border-gray-100 data-[error=true]:border-danger"
    {...props}
  />
)

export const InputIcon = (props: ComponentProps<'span'>) => (
  <span
    className="text-gray-400 group-focus-within:text-gray-100 group-[&:not(:has(input:placeholder-shown))]:text-gray-100 group-data-[error=true]:text-danger"
    {...props}
  />
)

export const InputField = (props: ComponentProps<'input'>) => (
  <input className="flex-1 outline-0 placeholder-gray-400" {...props} />
)
