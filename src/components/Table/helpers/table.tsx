import DeleteButton from "@/components/Cart/DeleteButton";
import ProductTitle from "@/components/Cart/ProductTitle";
import { ConfigItems } from "@/types/ConfigItems";
import { ItemCreator } from "@/types/ItemCreator";
import { ListItems } from "@/types/ListItem";
import { ProductsInCart } from "@/types/Product";
import { TableContent } from "@/types/TableContent";
import { generateItemsChooser } from "@/utils/generateComponents";
import toCamelCase from "@/utils/toCamelCase";

type Cost = string

const table_1 : ItemCreator<ProductsInCart, TableContent> = (data) => {
  let TotalSum: number = 0;

  data.forEach((item) => {
    TotalSum += item.quantity * item.price;
  });

  const headValues = ["Product", "Qty", "Price", "Remove"];
  const footerValues = ["", "Sub-total", "", `${TotalSum.toFixed(2)} MT`];

  const headContent: ListItems = headValues.map((item, index) => {
    return {
      label: toCamelCase(item),
      component: (
        <>
          <span>{item}</span>
        </>
      ),
    };
  });

  const bodyContent: ConfigItems = data.map((product) => {
    return {
      label: product.title,
      config: {
        product: {
          label: toCamelCase(product.title),
          component: <ProductTitle data={product} />,
        },
        qty: {
          label: "Quantity",
          component: (
            <>
              <span>{product.quantity}</span>
            </>
          ),
        },
        price: {
          label: "Price",
          component: (
            <>
              <span>{product.price.toFixed(2)} MT</span>
            </>
          ),
        },
        remove: {
          label: "Remove",
          component: <DeleteButton data={product} />,
        },
      },
    };
  });

  const footerContent: ListItems = footerValues.map((item, index) => {
    return {
      label: "subTotal",
      component: (
        <>
          <span className="font-bold sm:text-base md:text-2xl">{item}</span>
        </>
      ),
    };
  });

  return {
    head: headContent,
    body: bodyContent,
    // footer: footerContent,
  };
};



const components = [table_1]

export const tables = generateItemsChooser(components)