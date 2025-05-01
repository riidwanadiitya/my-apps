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
import { Input } from "@workspace/ui/components/input";

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function HomePage() {
  const [timer, setTimer] = React.useState<NodeJS.Timeout | null>(null);

  const [search, setSearch] = React.useState<string | undefined>(undefined);
  const [products, setProducts] = React.useState<IProduct[]>([]);

  const handleSearch = (value: string | undefined) => {
    if (value) {
      if (timer) clearTimeout(timer);

      const newTimer = setTimeout(() => {
        const filtered = productList.products.filter((item) =>
          item.title.toLowerCase().includes(value.toLowerCase())
        );

        setProducts(filtered);
      }, 500);

      setTimer(newTimer);
    } else {
      setProducts(productList.products);
    }
  };

  React.useEffect(() => {
    setProducts(productList.products);
  }, []);

  return (
    <FeatureLayout
      breadcrumb={[
        {
          title: "Home",
        },
      ]}
    >
      <div className="relative">
        <div className="py-5 px-4 sticky top-18 z-1 bg-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Input
            type="text"
            placeholder="Cari produk..."
            className="w-full"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">
          <div className="grid auto-rows-min max-[500px]:grid-cols-1 grid-cols-2 gap-4 lg:grid-cols-5 md:grid-cols-3 ">
            {products.map((product: IProduct) => (
              <div key={`product_${product.id}`}>
                <Link href={`/product/detail?id=${product.id}`}>
                  <div className="border border-b-0 rounded-t-xl relative w-full h-[auto] aspect-square overflow-hidden flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.title}
                      // width={250}
                      // height={250}
                      fill
                    />
                  </div>
                </Link>
                <Card className="rounded-t-none w-full">
                  <CardHeader className="px-2">
                    <p className="truncate" title={product.title}>
                      <Link href={`/product/detail?id=${product.id}`}>
                        {product.title}
                      </Link>
                    </p>
                  </CardHeader>
                  <CardDescription className="px-2">
                    <p
                      className="line-clamp-2 mb-3"
                      title={product.description}
                    >
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
      </div>
    </FeatureLayout>
  );
}
