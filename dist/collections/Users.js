"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
var PrimaryActionEmail_1 = require("../components/emails/PrimaryActionEmail");
var adminsAndUser = function (_a) {
    var user = _a.req.user;
    if (user.role === 'admin')
        return true;
    return {
        id: {
            equals: user.id,
        },
    };
};
exports.Users = {
    slug: "users",
    auth: {
        verify: {
            generateEmailHTML: function (_a) {
                var token = _a.token;
                return (0, PrimaryActionEmail_1.PrimaryActionEmailHtml)({
                    actionLabel: "verify your account",
                    buttonText: "Verify Account",
                    href: "".concat(process.env.NEXT_PUBLIC_APP_URL, "/verify-email?token=").concat(token)
                });
            },
        },
    },
    access: {
        read: adminsAndUser,
        create: adminsAndUser,
        update: function (_a) {
            var req = _a.req;
            return req.user.role === 'admin';
        },
        delete: function (_a) {
            var req = _a.req;
            return req.user.role === 'admin';
        },
    },
    admin: {
        hidden: function (_a) {
            var user = _a.user;
            return user.role !== 'admin';
        },
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
                condition: function () { return false; },
            },
            type: 'relationship',
            relationTo: 'products',
            hasMany: true,
        },
    ],
};
