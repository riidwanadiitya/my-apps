"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardDescription,
  CardHeader,
} from "@workspace/ui/components/card";
import Image from "next/image";
import Link from "next/link";
import BtnBuy from "@/components/btn-buy";
import FeatureLayout from "@/components/layouts/featureLayout";
import productList from "@/lib/products.json";

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function Page() {
  const {
    isPending,
    error,
    data: products,
    isFetching,
  } = useQuery<IProduct[]>({
    queryKey: ["all-products"],
    queryFn: async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      return await response.json();
    },
  });

  return (
    <FeatureLayout
      breadcrumb={[
        {
          title: "Home",
        },
      ]}
    >
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min max-[500px]:grid-cols-1 grid-cols-2 gap-4 lg:grid-cols-5 md:grid-cols-3">
          {productList.products.map((product: IProduct) => (
            <div key={`product_${product.id}`}>
              <Link href={`/product/detail?id=${product.id}`}>
                <div className="border border-b-0 rounded-t-xl relative w-full h-auto aspect-square overflow-hidden flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={250}
                    height={250}
                  />
                </div>
              </Link>
              <Card className="rounded-t-none">
                <CardHeader className="px-2">
                  <p className="truncate" title={product.title}>
                    <Link href={`/product/detail?id=${product.id}`}>
                      {product.title}
                    </Link>
                  </p>
                </CardHeader>
                <CardDescription className="px-2">
                  <p className="line-clamp-2 mb-3" title={product.description}>
                    {product.description}
                  </p>
                  <p className="pb-3 text-xl text-right font-semibold">
                    Rp{product.price.toLocaleString("id-ID")}
                  </p>

                  <BtnBuy data={product} />
                </CardDescription>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </FeatureLayout>
  );
}
