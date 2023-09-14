import { ConfigItems } from "@/types/ConfigItems";
import { ListItems } from "@/types/ListItem";
import * as React from "react";

interface ITableProps {
  config: TableItems;
  tableDataClassName?: React.ComponentProps<"td">["className"];
  tableHeadClassName?: React.ComponentProps<"th">["className"];
  tableRowClassName?: React.ComponentProps<"tr">["className"];
  bodyClassName?: React.ComponentProps<"tbody">["className"];
  headClassName?: React.ComponentProps<"thead">["className"];
  footerClassName?: React.ComponentProps<"tfoot">["className"];
  tableClassName?: React.ComponentProps<"table">["className"];
  colClassName?: React.ComponentProps<"col">["className"];
}

type TableItems = {
  head: ListItems;
  body: ConfigItems;
  footer?: ListItems;
};

const Table: React.FunctionComponent<ITableProps> = ({
  config,
  tableDataClassName,
  tableHeadClassName,
  tableRowClassName,
  bodyClassName,
  headClassName,
  footerClassName,
  tableClassName,
  colClassName,
}) => {
  const { head, body, footer } = config;

  return (
    <table className={tableClassName}>
      <colgroup>
        {head.map((item, index) => {
          return (
            <col
              className={colClassName}
              key={`${item.label}-${index}`}
              data-name={item.label}
            />
          );
        })}
      </colgroup>

      <thead className={headClassName}>
        <tr className={tableRowClassName}>
          {head.map((item, index) => (
            <th key={`${item.label}-${index}`} className={tableHeadClassName}>
              {item.component}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className={bodyClassName}>
        {body.map((bodyItem, index) => (
          <tr key={`${bodyItem.label}-${index}`} className={tableRowClassName}>
            {head.map((headItem, index) => (
              <td
                key={`${headItem.label}-${index}`}
                className={tableDataClassName}
              >
                {bodyItem.config[headItem.label].component}
              </td>
            ))}
          </tr>
        ))}
      </tbody>

      {footer && (
        <tfoot className={footerClassName}>
          <tr className={tableRowClassName}>
            {footer.map((item, index) => (
              <td key={`${item.label}-${index}`} className={tableDataClassName}>
                {item.component}
              </td>
            ))}
          </tr>
        </tfoot>
      )}
    </table>
  );
};

export default Table;
