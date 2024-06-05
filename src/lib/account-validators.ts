import { z } from 'zod'
export const AuthCredentialsValidator = z.object({
    email: z.string().email(),
    password:z.string().min(8,{
        message:'Password Must be 8 characters long',
    }),
    Address:z.string().min(20,{
        message:'address must be 20 characters long', 
    }),
    user_name:z.string(),
    City_Name:z.string(),
    State_Name:z.string(),
    Country:z.string(),
    Pincode: z.string().max(8,{
        message:'pincode must be lessthan 9 characters',
    }),
    Contect_Number:z.string().min(8,{
        message:'Contact number must be 8 characters long'
    }),
   
})

export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>


export const AuthValidator = z.object({
    email: z.string().email(),
    password:z.string().min(8,{
        message:'Password Must be 8 characters long',
    }),   
})

export type TAuthValidator = z.infer<typeof AuthValidator>


