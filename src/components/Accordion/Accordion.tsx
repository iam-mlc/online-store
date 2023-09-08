import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { DownChevron } from "../Icons";
import { ProductID, ProductTitle, Products } from "@/types/Product";

interface AccordionProps {
  data: ProductFAQ[];
  title?: ProductTitle;
  id?: ProductID;
}

type ProductFAQ ={
  question: string;
  answer: string;
}

const Accordion: React.FunctionComponent<AccordionProps> = ({ data, title, id }) => {
  return (
    <>
      <AccordionPrimitive.Root
        className="mt-8 "
        type="single"
        defaultValue="item-0"
        collapsible
      >
        {data.map((item, index) => {
          const { question, answer } = item;
          return (
            <AccordionPrimitive.Item
              value={`item-${index}`}
              className=" overflow-hidden  focus-within:ring-2 focus-within:ring-black"
              key={`${title} - ${id} - ${index}`}
            >
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="group w-full text-left border-2 border-black/[.08] px-6 py-2 shadow-inner flex justify-between">
                  <span>{question}</span>
                  <div className="w-[1.5em] h-[1.5em]">
                    <DownChevron
                      className={`group-data-[state=open]:rotate-180 translate transition-all duration-300 opacity-80`}
                    />
                  </div>
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionPrimitive.Content className="p-4 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden shadow-inner border-1 border">
                {answer}
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          );
        })}
      </AccordionPrimitive.Root>
    </>
  );
};

export default Accordion;
