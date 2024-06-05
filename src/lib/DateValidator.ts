import { z } from 'zod'

export const DateValidator = z.object({
    Booking_Date_Fto:z.string().max(15,{
        message:'this must be 15'
    }),
    Booking_Date_To:z.string(),
    total_Days:z.string(),
})

export type TDateValidators = z.infer<typeof DateValidator>