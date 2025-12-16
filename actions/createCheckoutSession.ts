import { BasketItem } from "@/zustandStore/store"

export type Metadata={
    orderNumber:string
    customerName:string
    customerEmail:string
    clerkUserId:string
}



export type GroupedBasketItem={
    product:BasketItem["product"]
    quantity:number
}

export async function createCheckoutSession(items:GroupedBasketItem[],metadata:Metadata){
    try {
        const  itemsWithoutPrice=items.filter(item=>!item.product.price);
        if(itemsWithoutPrice.length>0){
            throw new Error("Some items are missing price information.");
        }
        
        
    } catch (error) {
        console.error("Create checkout session error:", error);
        throw error;
        
    }

}