import {  ListItems } from "@/types/ListItem";
import Avatar from "../Avatar";
import { generateItemsChooser} from "@/utils/generateComponents";
import { Product, Products } from "@/types/Product";
import { ItemCreator } from "@/types/ItemCreator";
import { Categories } from "@/types/Categories";


type AvatarCreator = ItemCreator<Products | Categories<Products>,ListItems>;



// export const avatarsForProducts = (data : Record<string, any>[]) => data.map((item) =>{
//         return {
//             label: item.title,
//             component: (
//                 <Avatar img={item.thumbnail} text={item.title} dimensions={45}/>
//             )
//         }
// })

// export const avatarsForCategories = (categories: Record<string, any>, categoryNames: string[]) => categoryNames.map((categoryName) =>{

//         return {
//             label: categoryName,
//             component: (
//                 <Avatar img={categories[categoryName].thumbnail} text={categories[categoryName].title} dimensions={45}/>
//             )
//         }

// })

const avatar_1 : AvatarCreator = (data) => data.map((item, index) =>{
    return {
        label: item.title + index,
        component: (
            <Avatar img={item.thumbnail} text={item.title} dimensions={60}/>
        )
    }
    
})
const avatar_2 : AvatarCreator = (data) => data.map((item, index) =>{
    return {
        label: item.title + index,
        component: (
            <Avatar img={item.thumbnail} text={item.title} dimensions={45} hasOutline={true}/>
        )
    }
})

const components = [avatar_1, avatar_2]

export const avatarsCreator = generateItemsChooser(components);

