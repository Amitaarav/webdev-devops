// hash data key data
// bites: restaurants:sdjgh

export function getKeysName(...args: string[]){
    return `bites:${args.join(":")}`;
}

export const restaurantKeyById = (id: string) => getKeysName("restaurants", id);
export const reviewKeyById = (id: string ) => getKeysName("reviews", id);
export const reviewDetailsKeyById = (id : string) => getKeysName("review_details", id);
