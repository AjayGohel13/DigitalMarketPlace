import { z } from "zod";
import { privateProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { getPayloadClient } from "../get-payload";
import type Stripe from "stripe";
import { stripe } from "../lib/stripe";

export const paymentRouter = router({
    createOrder1: privateProcedure
        .input(z.object({ productIds: z.array(z.string()) }))
        .mutation(async ({ ctx, input }) => {
            const { user } = ctx
            let { productIds } = input
            if (productIds.length === 0) {
                throw new TRPCError({ code: 'BAD_REQUEST' })
            }

            const payload = await getPayloadClient()
            const { docs: product } = await payload.find({
                collection: 'products',
                where: {
                    id: {
                        in: productIds
                    },
                },
            })
            const filterProduct = product.filter((prod) => Boolean(prod.priceId))

            const order = await payload.create({
                collection: "orders",
                data: {
                    _isPaid: false,
                    product: filterProduct.map((prod) => prod.id),
                    user: user.id,
                }

            })


            const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

            filterProduct.forEach((prod) => {
                line_items.push({
                    price: prod.priceId!,
                    quantity: 1,
                })

            });

            line_items.push({
                price: "price_1PGv53SD4JihGdR1B4ZWgbLY",
                quantity: 1,
                adjustable_quantity: {
                    enabled: false,
                }
            })
            try {
                const stripeSession =
                    await stripe.checkout.sessions.create({
                        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/thankyou?orderId=${order.id}`,
                        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/wishlists`,
                        payment_method_types: ['card'],
                        mode: 'payment',
                        metadata: {
                            userId: user.id,
                            orderId: order.id,
                        },
                        line_items,
                    })


                return { url: stripeSession.url }
            } catch (err) {
                console.log(err)

                return { url: `${process.env.NEXT_PUBLIC_APP_URL}/wishlists` }
            }
        }),
        
    pollOrderStatus: privateProcedure
        .input(z.object({ orderId: z.string() }))
        .query(async ({ input }) => {
            const { orderId } = input

            const payload = await getPayloadClient()

            const { docs: orders } = await payload.find({
                collection: 'orders',
                where: {
                    id: {
                        equals: orderId,
                    },
                },
            })

            if (!orders.length) {
                throw new TRPCError({ code: 'NOT_FOUND' })
            }

            const [order] = orders

            return { isPaid: order._isPaid }
        }),
})
