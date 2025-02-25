'use client'

import { Copy, Link } from 'lucide-react'

import { IconButton, InputField, InputIcon, InputRoot } from '@/components'

type Props = {
  inviteLink: string
}

export const InputLink = ({ inviteLink }: Props) => {
  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink)
  }

  return (
    <InputRoot>
      <InputIcon>
        <Link className="size-5" />
      </InputIcon>

      <InputField readOnly defaultValue={inviteLink} />

      <IconButton className="-mr-2" onClick={copyInviteLink}>
        <Copy className="size-5" />
      </IconButton>
    </InputRoot>
  )
}
