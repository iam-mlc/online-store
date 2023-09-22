import { useRouter } from "next/router";
import * as React from "react";
import OrderedList from "../OrderedList/OrderedList";
import Link from "next/link";

interface BreadcrumbStep {
  label: string;
  path: string;
}

interface BreadcrumbProps {
  pathway: BreadcrumbStep[];
}

const Breadcrumb: React.FunctionComponent<BreadcrumbProps> = ({ pathway }) => {
  const router = useRouter();
  const currentPath = router.asPath;

  const getCurrentStepIndex = () => {
    return pathway.findIndex((step) => step.path === currentPath);
  };

  const items = pathway.map((step, index) => {
    return {
      label: step.path,
      component: (
        <div className="flex gap-1 items-center ">
          <div className="relative  ">
            {index === getCurrentStepIndex() ? (
              <>
                <span className="text-xs font-medium inline-block underline underline-offset-4">
                  {step.label}
                </span>
              </>
            ) : (
              <Link
                href={step.path}
                className="text-xs font-medium inline-block"
              >
                {step.label}
              </Link>
            )}
          </div>
          {!(index === pathway.length - 1) && (
            <div>
              <span className="font-bold">&gt;</span>
            </div>
          )}
        </div>
      ),
    };
  });

  return (
    <nav aria-label="breadcrumb" className="flex">
      <OrderedList
        items={items}
        itemClassName="flex items-center"
        listClassName="flex overflow-hidden text-gray-600 gap-1"
      />
    </nav>
  );
};

export default Breadcrumb;
