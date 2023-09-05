import toCamelCase from "./toCamelCase";
import { replaceSpacesWithHyphens } from "./replaceSpacesWithHyphens";
import toURL from "./toURL";
import  toName  from "./toName";

// const groupByCategory = (data : Record<string,any>) =>{
//     return data.reduce((previousProduct: Record<string, any>, currentProduct:Record<string, any>) => {
//       const category = toCamelCase(currentProduct.category);
//       if (!previousProduct[category]) {
//         previousProduct[category] = [];
//       }
//       previousProduct[category].push(currentProduct);
//       return previousProduct;
//     }, {});
// }


// const groupByCategory = (data: Record<string, any>) => {
//   return data.reduce((previousProduct: Record<string, any>, currentProduct: Record<string, any>) => {
//     const category = toCamelCase(currentProduct.category);
//     if (!previousProduct[category]) {
//       // If category doesn't exist, create a new object with thumbnail, items, name, and totalItems properties
//       previousProduct[category] = {
//         thumbnail: currentProduct.thumbnail,
//         items: [currentProduct],
//         title: toName(currentProduct.category),
//         totalItems: 1,
//         pathName: toURL(currentProduct.category)
//       };
//     } else {
//       // If category already exists, update the thumbnail property with the first matching item's thumbnail
//       if (previousProduct[category].items.length === 1) {
//         previousProduct[category].thumbnail = currentProduct.thumbnail;
//       }
//       previousProduct[category].items.push(currentProduct);
//       // Update the totalItems property with the total number of items in the category
//       previousProduct[category].totalItems += 1;
//     }
//     return previousProduct;
//   }, {});
// };

const groupByCategory = (data: Record<string, any>) => {
  const allProducts : Record<string,any> = {
    items: [],
    totalItems: 0,
    title: "All products",
    pathName: "all-products"
  };
  const groupedProducts = data.reduce((previousProduct: Record<string, any>, currentProduct: Record<string, any>) => {
    const category = toCamelCase(currentProduct.category);
    if (!previousProduct[category]) {
      previousProduct[category] = {
        thumbnail: currentProduct.thumbnail,
        items: [currentProduct],
        title: toName(currentProduct.category),
        totalItems: 1,
        pathName: toURL(currentProduct.category)
      };
    } else {
      if (previousProduct[category].items.length === 1) {
        previousProduct[category].thumbnail = currentProduct.thumbnail;
      }
      previousProduct[category].items.push(currentProduct);
      previousProduct[category].totalItems += 1;
    }
    allProducts.items.push(currentProduct);
    allProducts.totalItems += 1;
    return previousProduct;
  }, {});
  groupedProducts.allProducts = allProducts;
  return groupedProducts;
};


export const organizeData = (data: Record<string, any>) => {
  const allProducts : Record<string,any> = {
    items: [],
    totalItems: 0,
    title: "All products",
    pathName: "all-products"
  };
  const groupedProducts = data.reduce((previousProduct: Record<string, any>, currentProduct: Record<string, any>) => {
    const category = toCamelCase(currentProduct.category);
    if (!previousProduct[category]) {
      previousProduct[category] = {
        thumbnail: currentProduct.thumbnail,
        items: [currentProduct],
        title: toName(currentProduct.category),
        totalItems: 1,
        pathName: toURL(currentProduct.category)
      };
    } else {
      if (previousProduct[category].items.length === 1) {
        previousProduct[category].thumbnail = currentProduct.thumbnail;
      }
      previousProduct[category].items.push(currentProduct);
      previousProduct[category].totalItems += 1;
    }
    allProducts.items.push(currentProduct);
    allProducts.totalItems += 1;
    return previousProduct;
  }, {});
  groupedProducts.allProducts = allProducts;

  return Object.keys(groupedProducts).map((categoryName) => {
    return  groupedProducts[categoryName];
  });
  
};




export default groupByCategory;
