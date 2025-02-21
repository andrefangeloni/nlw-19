import { ArrowRight, Copy, Mail } from 'lucide-react'

import { Button, IconButton, InputField, InputIcon, InputRoot } from '@/components'

export default function Home() {
  return (
    <main>
      <Button type="submit">
        Enviar
        <ArrowRight />
      </Button>

      <IconButton>
        <Copy />
      </IconButton>

      <div>
        <InputRoot>
          <InputIcon>
            <Mail className="size-5" />
          </InputIcon>

          <InputField />
        </InputRoot>
      </div>
    </main>
  )
}
