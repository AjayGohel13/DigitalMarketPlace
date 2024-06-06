import express from "express";
import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./next-utils";
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from "./trpc"
import { inferAsyncReturnType } from "@trpc/server";
import dotenv from 'dotenv'
import path from "path";
import bodyParser from "body-parser";
import { IncomingMessage } from "http";
import { stripeWebhookHandler } from "./webHooks";
import nextBuild from 'next/dist/build'
import { PayloadRequest } from "payload/types";
import { parse } from 'url'



const app = express()
const PORT = Number(process.env.PORT) || 3000
const createContext = ({ req,
    res,
}: trpcExpress.CreateExpressContextOptions) => ({
    req,
    res,
})


export type ExpressContext = inferAsyncReturnType<typeof createContext>

export type WebhookRequest = IncomingMessage & {
    rawBody: Buffer
}
const start = async () => {



    const payload = await getPayloadClient({
        initOptions: {
            express: app,
            onInit: async (cms) => {
                cms.logger.info(`Admin Dashboard URL ${cms.getAdminURL()}`)
            },
        },
    })
    
    if (process.env.NEXT_BUILD) {
        app.listen(PORT, async () => {
            payload.logger.info(
                'Next.js is building for production'
            )
                  // @ts-expect-error
            await nextBuild(path.join(__dirname, '../'))

            process.exit()
        })

        return
    }

    const cartRouter = express.Router()

    cartRouter.use(payload.authenticate)
  
    cartRouter.get('/', (req, res) => {
      const request = req as PayloadRequest
  
      if (!request.user)
        return res.redirect('/sign-in?origin=wishlists')
  
      const parsedUrl = parse(req.url, true)
      const { query } = parsedUrl
  
      return nextApp.render(req, res, '/wishlists', parsedUrl.query)
    })

    app.use('/wishlists',cartRouter)



    app.use(
        '/api/trpc',
        trpcExpress.createExpressMiddleware({
            router: appRouter,
            createContext,
        })
    )
    app.use((req, res) => nextHandler(req, res))

    nextApp.prepare().then(() => {
        payload.logger.info('Next.js app is started');
        app.listen(PORT, async () => {
            payload.logger.info(`Next.js app URL: ${process.env.NEXT_PUBLIC_APP_URL}`)
        })
    })
}
start()
