import { Tag, TagIcon } from "lucide-react";
import { title } from "process";
import { defineField, defineType } from "sanity";

export const saleType = defineType({
  name: "sale",
  title: "Sale",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Sale Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Sale Description",
      type: "text",
    }),
    defineField({
      name: "discountAmount",
      title: "Discount Amount",
      type: "number",
      description: "Amount off in percentage ",
    }),
    defineField({
      name: "couponCode",
      title: "Coupon Code",
      type: "string",
    }),
    defineField({
      name: "validFrom",
      title: "Valid From",
      type: "datetime",
    }),
    defineField({
      name: "validuntil",
      title: "Valid Until",
      type: "datetime",
    }),
    defineField({
      name: "isActive",
      type: "boolean",
      title: "Is Active",
      description: "toggle to activate or deactivate the sale",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      discountAmount: "discountAmount",
      couponCode: "couponCode",
      isActive: "isActive",
    },
    prepare({ title, discountAmount, couponCode, isActive }) {
      const status = isActive ? "Active" : "Inactive";
      return {
        title,
        subtitle: `${status} Sale - ${discountAmount}% off with code: ${couponCode}`,
      };
    },
  },
});
