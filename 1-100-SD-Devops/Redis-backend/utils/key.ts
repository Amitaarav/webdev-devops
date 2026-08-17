// hash data key data
// bites: restaurants:sdjgh

export function getKeysName(...args: string[]){
    return `bites:${args.join(":")}`;
}

export const restaurantKeyById = (id: string) => getKeysName("restaurants", id);