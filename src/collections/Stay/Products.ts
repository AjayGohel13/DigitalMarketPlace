import { Product, User } from "../../payload-types";
import { BeforeChangeHook } from "payload/dist/globals/config/types";
import { Access, CollectionConfig, PayloadRequest } from "payload/types";
import { stripe } from '../../lib/stripe'
import { AfterChangeHook } from "payload/dist/collections/config/types";
interface Props {
    req: PayloadRequest
    data: any
}
const addUsers = async ({ req, data }: Props) => {
    const user = req.user

    return { ...data, user: user.id }
}

const syncUser: AfterChangeHook<Product> = async ({
    req,
    doc,
  }) => {
    const fullUser = await req.payload.findByID({
      collection: 'users',
      id: req.user.id,
    })
  
    if (fullUser && typeof fullUser === 'object') {
      const { products } = fullUser
  
      const allIDs = [
        ...(products?.map((product) =>
          typeof product === 'object' ? product.id : product
        ) || []),
      ]
  
      const createdProductIDs = allIDs.filter(
        (id, index) => allIDs.indexOf(id) === index
      )
  
      const dataToUpdate = [...createdProductIDs, doc.id]
   
      await req.payload.update({
        collection: 'users',
        id: fullUser.id,
        data: {
          products: dataToUpdate,
        },
      })
    }
  }

  const isAdminOrHasAccess =
  (): Access =>
  ({ req: { user: _user } }) => {
    const user = _user as User | undefined

    if (!user) return false
    if (user.role === 'admin') return true

    const userProductIDs = (user.products || []).reduce<
      Array<string>
    >((acc, product) => {
      if (!product) return acc
      if (typeof product === 'string') {
        acc.push(product)
      } else {
        acc.push(product.id)
      }

      return acc
    }, [])

    return {
      id: {
        in: userProductIDs,
      },
    }
  }

export const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        useAsTitle: 'name',
    },
    access: {
        read: isAdminOrHasAccess(),
        update: isAdminOrHasAccess(),
        delete: isAdminOrHasAccess(),
    
    },
    hooks: {
        afterChange: [syncUser],
        beforeChange: [
            addUsers,
            async (args) => {
                if (args.operation === 'create') {
                    const data = args.data as Product

                    const createdProduct = await stripe.products.create({
                        name: data.Name_Of_Product,
                        default_price_data: {
                            currency: "INR",
                            unit_amount: Math.round(parseInt(data.Price) * 100),
                        },
                    })

                    const updated: Product = {
                        ...data,
                        stripeId: createdProduct.id,
                        priceId: createdProduct.default_price as string,
                    }


                    return updated
                }
                else if (args.operation === 'update') {

                    const data = args.data as Product

                    const updatedProduct = await stripe.products.update(data.stripeId!, {
                        name: data.Name_Of_Product,
                        default_price: data.priceId!,
                    })

                    const updated: Product = {
                        ...data,
                        stripeId: updatedProduct.id,
                        priceId: updatedProduct.default_price as string
                    }
                    return updated
                }
            }
        ]
    },
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            hasMany: false,
            admin: {
                condition: () => false
            }
        },
        {
            name: "Name_Of_Product",
            label: "Name of Product",
            type: "text",
            required: true,
        },
        {
            name: "Brand_Name",
            label: "Brand Name",
            type: "text",
            required: true,
        },
        {
            name: "Color",
            label: "Color",
            type: "text",
            required: true,
        },
        {
            name: "Size",
            label: "Size",
            type: "text",
            required: true,
        },
        {
            name: "Style",
            label: "Style",
            type: "text",
            required: true,
        },
        {
            name: "description_Heading",
            type: "text",
            label: "description Heading",
        },
        {
            name: "description",
            type: "textarea",
            label: "description",
        },
        {
            name: "description_Heading2",
            type: "text",
            label: "description Heading 2",
        },
        {
            name: "description2",
            type: "textarea",
            label: "description2",
        },
        {
            name: "description_Heading3",
            type: "text",
            label: "description Heading 3",
        },
        {
            name: "description_3",
            type: "textarea",
            label: "description 3",
        },
        {
            name: "description_Heading_4",
            type: "text",
            label: "description Heading 4",
        },
        {
            name: "description_4",
            type: "textarea",
            label: "description 4",
        },
        {
            name:'Number_Of_Stock',
            type:'number',
            label:"Available Stock"
        },

        {
            name: "category",
            label: "category",
            type: "select",
            options: [
                {
                    label: "Electronics",
                    value: "Electronics",
                },
                {
                    label: "Clothes",
                    value: "Clothes",
                },
                {
                    label: "Home Applinces",
                    value: "Home_Applinces",
                },
                {
                    label: "Accessories",
                    value: "Accessories",
                },
                {
                    label: "Furniture",
                    value: "Furniture",
                },
                {
                    label: "Others",
                    value: "Others",
                },

            ],
            required: true,
        },
        {
            name: "SubCategory",
            label: "Sub_Category",
            type: "select",
            options: [
                {
                    label: "Laptops",
                    value: "Laptops",
                },
                {
                    label: "Smart Phones",
                    value: "Smart_Phones",
                },
                {
                    label: "Smart Watches",
                    value: "Smart_Watches",
                },
                {
                    label: "Cameras",
                    value: "Cameras",
                },
                {
                    label: "Video Games",
                    value: "Video_Games",
                },
                {
                    label: "Radios",
                    value: "Radios",
                },
                {
                    label: "Computers",
                    value: "Computers",
                },
                {
                    label: "Headphones",
                    value: "Headphones",
                },
                {
                    label: "WashingMachine",
                    value: "WashingMachine",
                },
                {
                    label: "Mixture",
                    value: "Mixture",
                },
                {
                    label: "Microwave",
                    value: "Microwave",
                },
                {
                    label: "Refridgerator",
                    value: "Refridgerator",
                },
                {
                    label: "Blender",
                    value: "Blender",
                },
                {
                    label: "Soda Maker",
                    value: "Soda_Maker",
                },
                {
                    label: "Charger/Cables/Handspre",
                    value: "Charger/Cables/Handspre",
                },
                {
                    label: "Oven",
                    value: "Oven",
                },
                {
                    label: "Gizzer",
                    value: "Gizzer",
                },
                {
                    label: "Cupboard",
                    value: "Cupboard",
                },
                {
                    label: "Tipoi",
                    value: "Tipoi",
                },
                {
                    label: "Headlamp",
                    value: "Headlamp",
                },
                {
                    label: "Library cupboard",
                    value: "Library_Cupboard",
                },
                {
                    label: "LadiesWare",
                    value: "LadiesWare",
                },
                {
                    label: "JentsWare",
                    value: "JentsWare",
                },
                {
                    label: "Kidswear",
                    value: "Kidswear",
                },
                {
                    label: "Hoodies",
                    value: "Hoodies",
                },
                {
                    label: "Jeans",
                    value: "Jeans",
                },
                {
                    label: "Shirts",
                    value: "Shirts",
                },
                {
                    label: "Others ",
                    value: "Others",
                },
                {
                    label: "Others Clothes",
                    value: "Others_Clothes",
                },
            ],
            required: true,
        },
        {
            name: "Price",
            label: "Price in INR",
            type: "text",
            required: true,
        },
        {
            name: "approvedForSale",
            label: "Product status",
            type: "select",
            defaultValue: "pending",
            access: {
                create: ({ req }) => req.user.role === "admin",
                read: ({ req }) => req.user.role === "admin",
                update: ({ req }) => req.user.role === "admin",
            },

            options: [
                {
                    label: "Pending verification",
                    value: "pending",
                },
                {
                    label: "Approved",
                    value: "approved",
                },
                {
                    label: "Denied",
                    value: "denied",

                },
            ],
        },
        {
            name: "priceId",
            access: {
                create: () => false,
                read: () => false,
                update: () => false
            },
            type: "text",
            admin: {
                hidden: true,
            }
        },
        {
            name: "stripeId",
            access: {
                create: () => false,
                read: () => false,
                update: () => false
            },
            type: "text",
            admin: {
                hidden: true,
            },
        },
        {
            name: "images",
            type: "array",
            label: "Stay images",
            minRows: 1,
            maxRows: 10,
            required: true,
            labels: {
                singular: "Image",
                plural: "Images"
            },
            fields: [
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                }
            ]
        }
    ]
}