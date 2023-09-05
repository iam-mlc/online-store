import { ListItem, ListItems } from "@/types/ListItem";
import { Product, Products } from "@/types/Product";
import { ProductCardProps } from "@/types/ProductCard";
import { TriggerAndContent } from "@/types/TriggerAndContent";
import { isValidElement } from "react";

interface CreateListItemOptions {
  data: Partial<Product> | Partial<Product>[];
  Component: React.FC<ProductCardProps> | React.ReactNode;
}

interface cardListItem {
  data: Partial<Product>;
  Component: React.FC<ProductCardProps> | React.ReactNode;
}

interface CreateDialogConfigParams {
  data: Partial<Product> | Products;
  Content: React.FC<ProductCardProps> | React.ReactNode;
  Trigger: React.ReactNode;
}
interface DialogConfigItemParams {
  data: Partial<Product>;
  Content: React.FC<ProductCardProps> | React.ReactNode;
  Trigger: React.ReactNode;
}

export function createCardListItems({
  data,
  Component,
}: CreateListItemOptions) {
  if (Array.isArray(data)) {
    return data.map((item, index) => {
      return cardListItem({ data: item, Component });
    }) as ListItems;
  } else {
    return cardListItem({ data: data, Component });
  }
}

const cardListItem = ({ data, Component }: cardListItem): ListItem => {
  return {
    label: `${data.id}`,
    component: (
      <>
        {typeof Component === "function" ? (
          <Component {...data} />
        ) : (
          <>
            {isValidElement(Component) ? <div>{Component}</div> : <div></div>}
          </>
        )}
      </>
    ),
  };
};

export function createDialogConfig({
  data,
  Content,
  Trigger,
}: CreateDialogConfigParams) {
  if (Array.isArray(data)) {
    return data.map((item, index) => {
      return dialogConfigItem({
        data: item,
        Content: Content,
        Trigger: Trigger,
      });
    });
  } else {
    return dialogConfigItem({
      data: data,
      Content: Content,
      Trigger: Trigger,
    });
  }
}

function dialogConfigItem({ data, Content, Trigger }: DialogConfigItemParams) {
  const { title } = data;

  const trigger: ListItem = {
    label: title || "",
    component: <>{Trigger}</>,
  };

  const content = createCardListItems({
    data: data,
    Component: Content,
  }) as ListItem;

  const config: TriggerAndContent = {
    trigger,
    content,
  };

  return {
    label: title || "",
    config: { ...config },
  };
}
