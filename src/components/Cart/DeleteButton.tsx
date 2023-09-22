import { Delete } from "@/components/Icons";
import { CartContext } from "@/contexts/CartContext/cartContext";
import { ProductInCart} from "@/types/Product";
import { useContext } from "react";

interface DeleteButton {
  data: ProductInCart;
}
const DeleteButton: React.FC<DeleteButton> = ({ data }) => {
  const { removeFromCart } = useContext(CartContext);
  return (
    <>
      <button onClick={() => removeFromCart(data.id)}>
        <Delete className="md:w-5 md:h-5 w-4 h-4" />
      </button>
    </>
  );
};

export default DeleteButton;