import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import React from "react";

interface IBreadcrumb {
  link?: string;
  title: React.ReactNode;
}

interface IProps {
  children: React.ReactNode;
  breadcrumb: IBreadcrumb[];
}
const FeatureLayout = ({ children, breadcrumb }: IProps) => {
  return (
    <div>
      <div className="flex items-center justify-end gap-2 px-4 pb-4">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumb.map((item, i) => (
              <React.Fragment key={`breadcrumb_${i}`}>
                <BreadcrumbItem className="hidden md:block">
                  {item.link ? (
                    <BreadcrumbLink href={item.link}>
                      {item.title}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.title}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {i !== breadcrumb.length - 1 && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default FeatureLayout;
