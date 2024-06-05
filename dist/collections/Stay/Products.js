"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
var stripe_1 = require("../../lib/stripe");
var addUsers = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var user;
    var req = _b.req, data = _b.data;
    return __generator(this, function (_c) {
        user = req.user;
        return [2 /*return*/, __assign(__assign({}, data), { user: user.id })];
    });
}); };
var syncUser = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var fullUser, products, allIDs_1, createdProductIDs, dataToUpdate;
    var req = _b.req, doc = _b.doc;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, req.payload.findByID({
                    collection: 'users',
                    id: req.user.id,
                })];
            case 1:
                fullUser = _c.sent();
                if (!(fullUser && typeof fullUser === 'object')) return [3 /*break*/, 3];
                products = fullUser.products;
                allIDs_1 = __spreadArray([], ((products === null || products === void 0 ? void 0 : products.map(function (product) {
                    return typeof product === 'object' ? product.id : product;
                })) || []), true);
                createdProductIDs = allIDs_1.filter(function (id, index) { return allIDs_1.indexOf(id) === index; });
                dataToUpdate = __spreadArray(__spreadArray([], createdProductIDs, true), [doc.id], false);
                return [4 /*yield*/, req.payload.update({
                        collection: 'users',
                        id: fullUser.id,
                        data: {
                            products: dataToUpdate,
                        },
                    })];
            case 2:
                _c.sent();
                _c.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
var isAdminOrHasAccess = function () {
    return function (_a) {
        var _user = _a.req.user;
        var user = _user;
        if (!user)
            return false;
        if (user.role === 'admin')
            return true;
        var userProductIDs = (user.products || []).reduce(function (acc, product) {
            if (!product)
                return acc;
            if (typeof product === 'string') {
                acc.push(product);
            }
            else {
                acc.push(product.id);
            }
            return acc;
        }, []);
        return {
            id: {
                in: userProductIDs,
            },
        };
    };
};
exports.Products = {
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
            function (args) { return __awaiter(void 0, void 0, void 0, function () {
                var data, createdProduct, updated, data, updatedProduct, updated;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(args.operation === 'create')) return [3 /*break*/, 2];
                            data = args.data;
                            return [4 /*yield*/, stripe_1.stripe.products.create({
                                    name: data.Name_Of_Product,
                                    default_price_data: {
                                        currency: "INR",
                                        unit_amount: Math.round(parseInt(data.Price) * 100),
                                    },
                                })];
                        case 1:
                            createdProduct = _a.sent();
                            updated = __assign(__assign({}, data), { stripeId: createdProduct.id, priceId: createdProduct.default_price });
                            return [2 /*return*/, updated];
                        case 2:
                            if (!(args.operation === 'update')) return [3 /*break*/, 4];
                            data = args.data;
                            return [4 /*yield*/, stripe_1.stripe.products.update(data.stripeId, {
                                    name: data.Name_Of_Product,
                                    default_price: data.priceId,
                                })];
                        case 3:
                            updatedProduct = _a.sent();
                            updated = __assign(__assign({}, data), { stripeId: updatedProduct.id, priceId: updatedProduct.default_price });
                            return [2 /*return*/, updated];
                        case 4: return [2 /*return*/];
                    }
                });
            }); }
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
                condition: function () { return false; }
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
            name: 'Number_Of_Stock',
            type: 'number',
            label: "Available Stock"
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
                create: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
                read: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
                update: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
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
                create: function () { return false; },
                read: function () { return false; },
                update: function () { return false; }
            },
            type: "text",
            admin: {
                hidden: true,
            }
        },
        {
            name: "stripeId",
            access: {
                create: function () { return false; },
                read: function () { return false; },
                update: function () { return false; }
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
};
