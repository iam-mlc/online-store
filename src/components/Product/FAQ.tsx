import * as React from 'react';
import Accordion from '../Accordion/Accordion';
import { Product } from '@/types/Product';

interface FAQsProps {
    data: Product;
}

const FAQs: React.FC<FAQsProps> = ({ data }) => {
    const faq = [
      {
        question: "Is this a real product?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        question: "What is this product?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        question: "How much does it cost?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    ];
  
    return (
      <>
        {/* {data.frequentlyAskedQuestions !== undefined && (
          <div className="mt-10 p-4">
            <div className="mt-5">
              <Heading level={"h2"}>Frequently Asked Questions</Heading>
            </div>
            <Accordion
              data={data.frequentlyAskedQuestions}
              title={data.title}
              id={data.id}
            />
          </div>
        )} */}
        {faq !== undefined && (
          <div className="flex flex-col gap-10">
            <div className="">
              <h2 className="md:text-4xl text-2xl font-bold text-center">
                Frequently Asked Questions
              </h2>
            </div>
            <Accordion data={faq} title={data.title} id={data.id} />
          </div>
        )}
      </>
    );
  };

export default FAQs;
