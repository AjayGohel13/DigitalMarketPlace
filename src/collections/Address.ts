import { Access, CollectionConfig } from "payload/types";

const yourOwn:Access = ({req:{user}})=>{
    if(user.role === "admin") return true

    return{
        user:{
            equals:user?.id,
        },
    }
}

export const Address: CollectionConfig = {
    slug: 'address',
    access:{
        read:yourOwn,
        create:()=>true,
        update:()=>true,
    },
    fields:[
        {
            name: "user",
            type:"text",
            admin:{
                hidden:true,
            },
            required: true,
        },
        {
            name: "user_name",
            type:"text",
            required:true
        },
        {
            name: "Password",
            type:"text",
            required:true
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
        }
    ]

}
