import { Copy, Link } from 'lucide-react'

import { IconButton, InputField, InputIcon, InputRoot } from '@/components'

export const InputLink = () => (
  <InputRoot>
    <InputIcon>
      <Link className="size-5" />
    </InputIcon>

    <InputField readOnly defaultValue="http://localhost:3000/invite/ajkdhajkhdkab" />

    <IconButton className="-mr-2">
      <Copy className="size-5" />
    </IconButton>
  </InputRoot>
)
