"use client";

import { Button } from "@workspace/ui/components/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog";
import { useRootStores } from "@/stores";

interface IProps {
  children?: React.ReactNode;
}

const ConfirmBuy = ({ children }: IProps) => {
  const { carts } = useRootStores();

  const handleSubmit = () => {
    const payload = carts.map((item) => ({
      name: item.title,
      qty: item.qty,
      price: item.price,
      notes: item.notes,
    }));

    const products = payload
      .map((p) => `${p.name} : ${p.qty}${p.notes ? ` (${p.notes})` : ``}`)
      .join("\n");

    const totalQty = payload.reduce((sum, item) => sum + item.qty, 0);

    let phone = "6289639247810";
    let message = `Bang pesen dong\n\n${products}\n\ntotal produk : ${totalQty}`;

    let url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank");

  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full cursor-pointer">Beli</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Pesan</AlertDialogTitle>
          <AlertDialogDescription>
            Apa kamu ingin lanjut memesan? Jika ya, pejaga toko akan segera
            mengonfirmasi pesanan anda.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Batal
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit} className="cursor-pointer">
            Ya, lanjutkan
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmBuy;
