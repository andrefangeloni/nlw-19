import { ArrowRight, Copy } from 'lucide-react'

import { Button, IconButton } from '@/components'

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
    </main>
  )
}
