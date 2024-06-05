import { PrimaryActionEmailHtml } from "../components/emails/PrimaryActionEmail";
import { CollectionConfig, Access } from "payload/types";


const adminsAndUser: Access = ({ req: { user } }) => {
  if (user.role === 'admin') return true

  return {
    id: {
      equals: user.id,
    },
  }
}

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return   PrimaryActionEmailHtml({
          actionLabel: "verify your account",
          buttonText: "Verify Account",
          href: `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`
        })
      },
    },
  },

  access: {
    read: adminsAndUser,
    create: adminsAndUser,
    update: ({ req }) => req.user.role === 'admin',
    delete: ({ req }) => req.user.role === 'admin',
  },

  admin: {
    hidden: ({ user }) => user.role !== 'admin',
    defaultColumns: ['id'],
  },


  fields: [
    {
      name: 'role',
      defaultValue: 'user',
      required: true,
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
    },
    {
      name: "user_name",
      type: "text",
      required: true
    },
    {
      name: "City_Name",
      label: "City name for location",
      type: "text",
      required: true,
    },
    {
      name: "State_Name",
      label: "State name for location",
      type: "text",
      required: true,
    },
    {
      name: "Country",
      label: "Country",
      type: "text",
      required: true,
    },
    {
      name: "Pincode",
      label: "Pincode",
      type: "text",
      required: true,
    },
    {
      name: "Address",
      type: "textarea",
      label: "Address details",
      required: true,
    },
    {
      name: "Contect_Number",
      type: "text",
      label: "Contact Number",
      required: true,
    },
    {
      name: 'products',
      label: 'Products',
      admin: {
        condition: () => false,
      },
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },

  ],
}