import { BasketIcon } from "@sanity/icons";
import { Currency } from "lucide-react";
import { defineArrayMember, defineField, defineType, Preview } from "sanity";

export const orderType = defineType({
  name: "order",
  title: "Order",
  type: "document",
  icon: BasketIcon,
  fields: [
    defineField({
      name: "orderNumber",
      title: "Order Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stripecheckoutsessionid",
      title: "Stripe Checkout Session ID",
      type: "string",
    }),
    defineField({
      name: "stripecustomerid",
      title: "Stripe Customer ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clerkuserid",
      title: "Clerk User ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customenName",
      title: "Customer Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Customer Email",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stripePaymentIntentId",
      title: "Stripe Payment Intent ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Product Bought",
              type: "reference",
              to: [{ type: "product" }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "quantity",
              title: "Quantity Purchased",
              type: "number",
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: {
              product: "product.name",
              quantity: "quantity",
              image: "product.image",
              price: "product.price",
              currency: "product.currency",
            },
            prepare({ product, quantity, image, price, currency }) {
              return {
                title: `Order of ${quantity} x ${product}`,
                subtitle: `Total: ${(price * quantity).toFixed(2)} ${currency}`,
                media: image,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "totalPrice",
      title: "Total Price",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "amountdiscount",
      title: "Amount Discount",
      type: "number",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      name: "customerName",
      amount: "totalPrice",
      Currency: "currency",
      orderId: "orderNumber",
      email: "email",
    },
    prepare(select) {
      const { name, amount, Currency, orderId, email } = select;
      return {
        title: `Order ${orderId} - ${name}`,
        subtitle: `${amount} ${Currency} - ${email}`,
        media: BasketIcon,
      };
    },
  },
});
