import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import path from "path";
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from "payload/config";
import { Users } from "./collections/Users";
import dotenv from 'dotenv'
import { Media } from "./collections/Media";
import { Orders } from "./collections/Orders";
import { Products } from "./collections/Stay/Products";

dotenv.config({
    path: path.resolve(__dirname, '../.env'),
  })
export default buildConfig({
    serverURL:process.env.NEXT_PUBLIC_APP_URL || '',
    collections: [Users,Media,Orders,Products],
    routes:{
        admin:'/sell'
    },
    admin:{
        user: 'users',
        bundler: webpackBundler(),
        meta:{
            titleSuffix:'-OnlineRestaurent',
            favicon:'/favicon.ico',
            ogImage:'/thumbnail.jpg',
        }
    },
    rateLimit:{
        max:2000,
    },
    
    editor:slateEditor({}),
    db: mongooseAdapter({
        url:process.env.MONGODB_URL!,
    
    }),
    typescript:{
        outputFile: path.resolve(__dirname,'payload-types.ts'),
    }
})