'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { User, Mail, ArrowRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

import { InputRoot, InputIcon, InputField, Button } from '@/components'

import { postSubscriptions } from '@/http/api'

const subscriptionFormSchema = z.object({
  name: z.string().min(2, 'Digite o seu nome completo'),
  email: z.string().email('Digite um email válido'),
})

type FormData = z.infer<typeof subscriptionFormSchema>

export const SubscriptionForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(subscriptionFormSchema),
  })

  const onSubmit = async ({ name, email }: FormData) => {
    const referrerId = searchParams.get('referrer')

    const { subscriberId } = await postSubscriptions({
      name,
      email,
      referrerId,
    })

    router.push(`/invite/${subscriberId}`)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-700 border border-gray-600 rounded-2xl p-8 space-y-6 w-full md:max-w-[440px]"
    >
      <h2 className="font-heading font-semibold text-gray-200 text-xl">Inscrição</h2>

      <div className="space-y-3">
        <div className="space-Y-2">
          <InputRoot>
            <InputIcon>
              <User />
            </InputIcon>
            <InputField type="text" placeholder="Nome completo" {...register('name')} />
          </InputRoot>

          {errors.name ? <p className="text-danger text-xs font-semibold">{errors.name.message}</p> : null}
        </div>

        <div className="space-y-2">
          <InputRoot>
            <InputIcon>
              <Mail />
            </InputIcon>
            <InputField type="email" placeholder="E-mail" {...register('email')} />
          </InputRoot>

          {errors.email ? <p className="text-danger text-xs font-semibold">{errors.email.message}</p> : null}
        </div>
      </div>

      <Button type="submit">
        Confirmar
        <ArrowRight />
      </Button>
    </form>
  )
}
