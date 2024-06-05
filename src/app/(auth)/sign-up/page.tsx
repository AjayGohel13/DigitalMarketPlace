"use client"
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthCredentialsValidator, TAuthCredentialsValidator } from '../../../lib/account-validators'
import { useForm } from 'react-hook-form'
import { trpc } from '@/trpc/client'
import { ZodError } from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
const Page = () => {
  const router = useRouter()
  const { mutate, isLoading } =
    trpc.auth.createPayloadUser.useMutation({
      onError: (err) => {
        if (err.data?.code === 'CONFLICT') {
          toast.error(
            'This email is already in use. Sign in instead?'
          )

          return
        }
        if (err instanceof ZodError) {
          toast.error(err.issues[0].message)
          return
        }

        toast.error(
          'Something went wrong. Please try again.'
        )
      },
      onSuccess: ({ sentToEmail }) => {
        toast.success(
          `Verification email sent to ${sentToEmail}.`
        )
        router.push('/verify-email?to=' + sentToEmail)
      },
    })

  const { register,
    handleSubmit,
    formState: { errors },

  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),

  })
  const onSubmit = ({
    email,
    password,
    Address,
    user_name,
    City_Name,
    State_Name,
    Country,
    Pincode,
    Contect_Number,
  }: TAuthCredentialsValidator) => {
    mutate({ email, password, Address, user_name, City_Name, State_Name, Country, Pincode, Contect_Number })
  }
  return (
    <>
      <div>

        <div className="min-h-screen p-6 bg-green-100 flex items-center justify-center">
          <div className="container max-w-screen-lg mx-auto">
            <div>
              <div className="bg-green-50 rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="text-gray-600">
                    <Image
                      src="/AJLogo.png"
                      height={100}
                      width={100}
                      alt="hippo email image"
                    />
                    <p className="font-medium text-lg">Personal Details</p>
                    <p>Please fill out all the fields.</p>


                  </div>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="lg:col-span-2">
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-5">
                          <Label >Full Name</Label>
                          <Input {...register('user_name')} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                        </div>

                        <div className="md:col-span-5">
                          <Label >Email Address</Label>
                          <Input {...register('email')} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="email@domain.com" />
                          {errors?.email && (
                            <p className='text-sm text-red-500'>
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        <div className="md:col-span-5">
                          <Label>Password</Label>
                          <Input {...register('password')} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="##########" />
                          {errors?.password && (
                            <p className='text-sm text-red-500'>
                              {errors.password.message}
                            </p>
                          )}
                        </div>
                        <div className="md:col-span-5">
                          <Label>Contact Number</Label>
                          <Input {...register('Contect_Number')} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="0000000000" />
                          {errors?.Contect_Number && (
                            <p className='text-sm text-red-500'>
                              {errors.Contect_Number.message}
                            </p>
                          )}
                        </div>

                        <div className="md:col-span-3">
                          <Label >Address / Street</Label>
                          <Input {...register('Address')} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                          {errors?.Address && (
                            <p className='text-sm text-red-500'>
                              {errors.Address.message}
                            </p>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <Label >City</Label>
                          <Input {...register('City_Name')} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                          {errors?.City_Name && (
                            <p className='text-sm text-red-500'>
                              {errors.City_Name.message}
                            </p>
                          )}
                        </div>


                        <div className="md:col-span-2">
                          <Label >State / province</Label>
                          <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                            <Input {...register('State_Name')} placeholder="State" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />
                            {errors?.State_Name && (
                              <p className='text-sm text-red-500'>
                                {errors.State_Name.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="md:col-span-2">
                          <Label >Country / region</Label>
                          <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                            <Input {...register('Country')} placeholder="Country" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />
                            {errors?.Country && (
                              <p className='text-sm text-red-500'>
                                {errors.Country.message}
                              </p>
                            )}
                          </div>
                        </div>



                        <div className="md:col-span-1">
                          <Label >pincode</Label>
                          <Input {...register('Pincode')} className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                          {errors?.Pincode && (
                            <p className='text-sm text-red-500'>
                              {errors.Pincode.message}
                            </p>
                          )}
                        </div>

                        <div className="md:col-span-5 text-right">
                          <div className="inline-flex items-end">
                            <Button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded">Submit</Button>
                          </div>
                          <div>
                            <Link
                              className={buttonVariants({
                                variant: 'link',
                                className: 'gap-1.5',
                              })}
                              href='/sign-in'>
                              Already have an account? Sign-in
                              <ArrowRight className='h-4 w-4' />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
