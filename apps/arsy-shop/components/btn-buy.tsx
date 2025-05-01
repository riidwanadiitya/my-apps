import { IProduct } from "@/app/home/page";
import { ICart, useRootStores } from "@/stores";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Minus, Plus, Trash } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

interface IProps {
  data: IProduct;
}

const BtnBuy = ({ data }: IProps) => {
  const [product, setProduct] = React.useState<ICart>();

  const { carts, updateCart } = useRootStores();

  const pathname = usePathname();
  const isCartPage = pathname === "/cart";

  const handleDelete = () => {
    const newCarts = carts.filter((item) => item.id !== data.id);

    updateCart(newCarts);
    setProduct(undefined);
  };

  const handleBuy = () => {
    const payload = { ...data, qty: 1 };
    updateCart([...carts, payload]);
  };

  const handleQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    if (value && value > 0) {
      const payload = carts.map((item) =>
        item.id === data.id ? { ...item, qty: value } : item
      );

      updateCart(payload);
    }
  };

  const increment = () => {
    const payload = carts.map((item) =>
      item.id === data.id ? { ...item, qty: item.qty + 1 } : item
    );

    updateCart(payload);
  };

  const decrement = () => {
    const payload = carts.map((item) => {
      if (item.qty > 1) {
        return item.id === data.id ? { ...item, qty: item.qty - 1 } : item;
      }

      return item;
    });

    updateCart(payload);
  };

  React.useEffect(() => {
    if (data) {
      const hasId = carts.some((cart) => cart.id === data.id);
      if (hasId) {
        const productCart = carts.find((c) => c.id === data.id);
        setProduct(productCart);
      } else {
        setProduct(undefined);
      }
    }
  }, [carts, data]);

  return (
    <div>
      {product ? (
        <div className="flex items-center justify-center">
          <div className="flex gap-3">
            {isCartPage ? (
              <>
                <Button
                  onClick={handleDelete}
                  className="cursor-pointer hover:bg-red-500 hover:text-white text-red-500"
                >
                  <Trash />
                </Button>
                <Button
                  onClick={decrement}
                  className="cursor-pointer"
                  disabled={product.qty <= 1}
                >
                  <Minus />
                </Button>
              </>
            ) : product.qty <= 1 ? (
              <Button
                onClick={handleDelete}
                className="cursor-pointer hover:bg-red-500 hover:text-white text-red-500"
              >
                <Trash />
              </Button>
            ) : (
              <Button onClick={decrement} className="cursor-pointer">
                <Minus />
              </Button>
            )}
            <Input
              type="number"
              placeholder="quantity"
              value={product.qty}
              className="w-18"
              max={99}
              min={1}
              onChange={handleQty}
            />
            <Button onClick={increment} className="cursor-pointer">
              <Plus />
            </Button>
          </div>
        </div>
      ) : (
        <Button className="w-full cursor-pointer" onClick={handleBuy}>
          Buy
        </Button>
      )}
    </div>
  );
};

export default BtnBuy;
