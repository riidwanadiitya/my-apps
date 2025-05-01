"use client";

import BtnBuy from "@/components/btn-buy";
import ConfirmBuy from "@/components/confirm-buy";
import FeatureLayout from "@/components/layouts/featureLayout";
import LayoutBack from "@/components/layouts/layoutBack";
import { useRootStores } from "@/stores";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Cart = () => {
  const { carts: products } = useRootStores();

  const [totalQty, setTotalQty] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);

  React.useEffect(() => {
    const qty = products.reduce((sum, item) => sum + item.qty, 0);
    const price = products.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    setTotalQty(qty);
    setTotalPrice(price);
  }, [products]);

  return (
    <FeatureLayout
      breadcrumb={[
        {
          title: "Home",
        },
        {
          title: "Cart",
        },
      ]}
    >
      <LayoutBack>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="grid gap-5 col-span-2 order-2 md:order-1">
              {products?.map((product) => (
                <div
                  key={`product_${product.id}`}
                  className="flex w-full border rounded-xl"
                >
                  <Link href={`/product/detail?id=${product.id}`}>
                    <div className="p-4 flex items-center h-full w-auto">
                      <div className="relative w-full h-auto aspect-square overflow-hidden flex items-center justify-center">
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </Link>
                  <Card className="border-0 w-full grid grid-cols-1 gap-4 md:grid-cols-7 p-4 pl-0">
                    <div className="col-span-4 flex items-center">
                      <p className="truncate" title={product.title}>
                        <Link href={`/product/detail?id=${product.id}`}>
                          {product.title}
                        </Link>
                      </p>
                    </div>
                    <div className="flex flex-col justify-end items-end col-span-3">
                      <p className="pb-3 text-xl text-right font-semibold">
                        Rp{product.price.toLocaleString("id-ID")}
                      </p>

                      <BtnBuy data={product} />
                    </div>
                  </Card>
                </div>
              ))}
            </div>
            <div className="order-1 md:order-2">
              <Card className="p-4">
                <CardTitle className="text-2xl">Ringkasan Belanja</CardTitle>
                <CardDescription className="text-white text-xl">
                  <div className="flex justify-between">
                    <p>Total {`(${totalQty})`}</p>
                    <p>Rp{`${totalPrice.toLocaleString("id-ID")}`}</p>
                  </div>
                </CardDescription>
                <CardAction className="w-full">
                  <ConfirmBuy />
                </CardAction>
              </Card>
            </div>
          </div>
        ) : (
          <div className="w-full text-center">
            <p className="mb-5">Keranjang kosong.</p>
            <Link href="/home">
              <Button className="cursor-pointer">Beli Produk</Button>
            </Link>
          </div>
        )}
      </LayoutBack>
    </FeatureLayout>
  );
};

export default Cart;
