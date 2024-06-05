import AddToCartButton from "@/components/AddToWishListButton"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import ProductReel from "@/components/ProductReel"
import ImageSlider from "@/components/imageSlider"
import { PRODUCT_CATEGORY } from "@/config/product_category"
import { getPayloadClient } from "@/get-payload"
import { getServerSideUser } from "@/lib/payload-utils"
import { formatPrice } from "@/lib/utils"
import { Check, CircleAlert, Dot, FileText, Home, Leaf, Mail, Shield, ShieldCheck, SquareCheckBig } from "lucide-react"
import { cookies } from "next/headers"
import Link from "next/link"
import { notFound } from "next/navigation"


interface PageProps {
  params: {
    productId: string
  }
}
const BREADCRUMBS = [
  { id: 1, name: 'Home', href: "/" },
  { id: 3, name: 'Product', href: '/product' },
]
const Page = async ({ params }: PageProps) => {
  const { productId } = params
  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)

  const payload = await getPayloadClient()
  const { docs: products } = await payload.find({
    collection: 'products',
    limit: 1,
    where: {
      id: {
        equals: productId
      },
      approvedForSale: {
        equals: 'approved',
      }
    }
  })
  const [product] = products

  const { docs: order } = await payload.find({
    collection: 'orders',
    where: {
      product: {
        equals: productId,
      },
      user: {
        equals: user?.id
      }

    }
  })
  const stock = Number(product.Number_Of_Stock)
  console.log(stock)

  const perks = [
    {
      name: "Delivery Notes",
      Icon: Home,
      description: "Users can choose preferred delivery windows. Keeps users informed about order status, estimated delivery time, and special offers.Supports cashless payments"
    },
    {
      name: "Enjoy some flexibility",
      Icon: ShieldCheck,
      description: "AJ's customer support team is ready to assist you with any queries or technical issues.  Protect your investments with extended warranty options."
    },
    {
      name: "Exclusive Collaborations",
      Icon: Leaf,
      description: " Be part of the hype with exclusive drops. AJ collaborates with artists, designers, and athletes to create unique pieces."
    }
  ]

  const [orders] = order
  if (!product) return notFound()

  const label = PRODUCT_CATEGORY.find(({ value }) => value === product.category)?.label
  const validUrls = product.images.map(({ image }) =>
    typeof image === "string" ? image : image.url)
    .filter(Boolean) as string[]

  return <MaxWidthWrapper >
    <div>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
        {/* Product Details */}
        <div className='lg:max-w-lg lg:self-end'>
          <ol className='flex items-center space-x-2'>
            {BREADCRUMBS.map((breadcrumb, i) => (
              <li key={breadcrumb.href}>
                <div className='flex items-center text-sm'>
                  <Link
                    href={breadcrumb.href}
                    className='font-medium text-sm text-muted-foreground hover:text-gray-900'>
                    {breadcrumb.name}
                  </Link>
                  {i !== BREADCRUMBS.length - 1 ? (
                    <svg
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      aria-hidden='true'
                      className='ml-2 h-5 w-5 flex-shrink-0 text-gray-300'>
                      <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                    </svg>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>

          <div className='mt-4'>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              {product.Name_Of_Product}
            </h1>
          </div>

          <section className='mt-4'>
            <div className='flex items-center'>
              <p className='font-medium text-gray-900'>
                {formatPrice(product.Price)}
              </p>

              <div className='ml-4 border-l text-muted-foreground border-gray-300 pl-4'>
                {label}
              </div>
            </div>

            <div className='mt-4 space-y-6'>
              <p className='text-base text-muted-foreground'>
                {product.description}
              </p>
            </div>

            <div className='mt-6 flex items-center'>
              <Check
                aria-hidden='true'
                className='h-5 w-5 flex-shrink-0 text-green-500'
              />
              <p className='ml-2 text-sm text-muted-foreground'>
                Eligible for instant delivery
              </p>
            </div>
            {Number(product.Number_Of_Stock) < 10 && <div className='mt-6 flex items-center'>
              <CircleAlert aria-hidden='true' className='h-5 w-5 flex-shrink-0 text-red-500' />
              <p className='ml-2 text-sm text-muted-foreground text-red-500 '>
                Hurry Up only {' '}{product.Number_Of_Stock} {product.Name_Of_Product} left...
              </p>
            </div>}
          </section>
        </div>

        {/* Product images */}
        <div className='mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center'>
          <div className='aspect-square rounded-lg'>
            <ImageSlider urls={validUrls} />
          </div>
        </div>

        {/* add to cart part */}
        <div className='mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start'>
          <div>
            <div className='mt-10'>
              <AddToCartButton  product={product} />
            </div>
            <div className='mt-6 text-center'>
              <div className='group inline-flex text-sm text-medium'>
                <Shield
                  aria-hidden='true'
                  className='mr-2 h-5 w-5 flex-shrink-0 text-gray-400'
                />
                <span className='text-muted-foreground hover:text-gray-700'>

                  30 Day Return Guarantee
                </span>

              </div>
            </div>
          </div>

        </div>


      </div>

      <div>
        <div>
          <h3 className="text-2xl font-semibold  capitalize dark:text-white flex justify-start items-center" ><Dot size={50} color="green" strokeWidth={3} />{product.description_Heading}:</h3>
          <p className="ml-4 text-muted-foreground">{product.description}</p>

        </div>
        <div>
          <h3 className="text-2xl font-semibold  capitalize dark:text-white flex justify-start items-center"><Dot size={50} color="green" strokeWidth={3} />{product.description_Heading2}:</h3>
          <p className="ml-4 text-muted-foreground">{product.description2}</p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold  capitalize dark:text-white flex justify-start items-center"><Dot size={50} color="green" strokeWidth={3} />{product.description_Heading3}:</h3>
          <p className="ml-4 text-muted-foreground">{product.description_3}</p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold  capitalize dark:text-white flex justify-start items-center"><Dot size={50} color="green" strokeWidth={3} />{product.description_Heading_4}:</h3>
          <p className="ml-4 text-muted-foreground">{product.description_4}</p>
        </div>
      </div>

    </div>

    <ProductReel
      href="/product"
      query={{ category: product.category, limit: 8 }}
      title={`Similar ${product.category}`}
      subtitle={`Browse Similar high Quality ${product.category} just like ${product.Name_Of_Product}`}
    />

    <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
      {perks.map((perk) => (
        <div key={perk.name} className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
          <div className="md:flex-shrink-0 flex  justify-center">
            <div className="justify-center h-16 w-16 flex items-center rounded-full bg-green-100 text-green-500">
              {<perk.Icon className='w-1/3 h-1/3 scale-150' />}
            </div>
          </div>
          <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
            <h3 className="text-2xl font-bold  text-gren-900">
              {perk.name}
            </h3>
            <p className="mt-3 text-medium  font-muted-foreground">{perk.description}</p>
          </div>
        </div>
      ))}


    </div>
  </MaxWidthWrapper>
}
export default Page