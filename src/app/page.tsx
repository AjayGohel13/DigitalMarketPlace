import Accordion from "@/components/FAq";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import ProductReel from "@/components/ProductReel";
import { Button, buttonVariants } from "@/components/ui/button";
import {  Home, Leaf, ShieldCheck } from "lucide-react"
import Image from "next/image";
import Link from "next/link";

export default function Homes() {
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
  return (
    <>
    <MaxWidthWrapper className="bg-green-50" >
        <p className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            You&apos;re Own Market Place {' '}
            <span className=" text-green-300 ">
            Find product for you 
          </span>

          </h1>
          <p className="mt-6 rext-lg max-w-prose text-muted-foreground ">Extraordinary experiences hosted by the world&apos;s greatest names in music, film, TV, art, sports and more
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href='/product' className={buttonVariants()}>Browse</Link>
            <Button variant='ghost'>Our Qualitty Promise &rarr;</Button>
          </div>
        </p>
        <ProductReel query={{sort: "desc",limit:4}} title="Latest" href="/product" subtitle="For best experience"/>
      </MaxWidthWrapper>
      <section className="">
        <MaxWidthWrapper className="py-20 bg-green-50">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
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
          <Accordion/>

        </MaxWidthWrapper>
      </section>
    </>
  );
}
