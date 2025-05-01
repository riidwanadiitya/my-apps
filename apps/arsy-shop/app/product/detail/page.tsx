"use client";

import { IProduct } from "@/app/home/page";
import BtnBuy from "@/components/btn-buy";
import FeatureLayout from "@/components/layouts/featureLayout";
import LayoutBack from "@/components/layouts/layoutBack";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";
import ProductList from "@/lib/products.json";
import { ImageOff } from "lucide-react";

const ProductDetail = () => {
  const params = useSearchParams();
  const id = params.get("id");

  const [data, setData] = React.useState<IProduct>();

  React.useEffect(() => {
    if (id) {
      const product = ProductList.products.find(
        (item) => item.id === parseInt(id)
      );
      setData(product);
    }
  }, [id]);

  return (
    <FeatureLayout
      breadcrumb={[
        {
          title: "Home",
        },
        {
          title: "Product",
        },
        {
          title: "Detail",
        },
      ]}
    >
      <LayoutBack>
        <div className="text-center grid gap-10">
          <div className="flex justify-center">
            {data?.image ? (
              <Image
                src={data?.image ?? ""}
                alt={data?.title ?? "data-image"}
                width={200}
                height={200}
              />
            ) : (
              <div className="w-[200px] h-[200px] flex items-center justify-center bg-gray-50/10 ">
                <ImageOff size={"200px"} className="opacity-20" />
              </div>
            )}
          </div>
          <div className="px-20">
            <p className="text-2xl font-bold mb-2">{data?.title}</p>
            <p className="mb-5">{data?.description}</p>
            <p className="text-xl font-bold">
              Rp{data?.price.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-25">{data && <BtnBuy data={data} />}</div>
          </div>
        </div>
      </LayoutBack>
    </FeatureLayout>
  );
};

export default ProductDetail;
