import { CartContext } from "@/contexts/CartContext/cartContext";
import GeolocationContext from "@/contexts/GeoLocationContext/GeolocationContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

interface ValidationMessageProps {
  canDisplayMessage: boolean;
}

const ValidationMessage: React.FC<ValidationMessageProps> = ({
  canDisplayMessage,
}) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const { cartData } = useContext(CartContext);
  let successTimeout: NodeJS.Timeout;
  const {
    coords,
    isError,
    isLoading,
    isSupported,
    isRetrying,
    isRejected,
    reachedTimeout,
  } = useContext(GeolocationContext);

  useEffect(() => {
    if (coords) {
      setShowSuccess(true);
      successTimeout = setTimeout(() => {
        setShowSuccess(false);
        setShowWarning(true);
      }, 2000);
    } else {
      setShowWarning(false);
    }
  }, [coords]);

  return (
    <div>
      {cartData.totalItems < 3 && (
        <p className="text-xs text-yellow-500">
          You need at least 3 items in your cart to have your products deliverd
          to you.
        </p>
      )}
      {showSuccess && (
        <div className="text-green-500 text-xs">Success ! ✔️</div>
      )}
      {isLoading && (
        <p className="text-yellow-500 text-xs">Getting Location...🏃</p>
      )}
      {!isSupported && !isRejected && (
        <p className="text-red-500">
          Your browser does not support Geolocation 😔. We won't be able to
          deliver the desired products to your location. You can get your
          products at{" "}
          <Link href="/" className="underline">
            Our location
          </Link>
        </p>
      )}
      {!canDisplayMessage && !isRejected && cartData.totalItems > 3 && (
        <p className="text-yellow-500 text-xs">Your Geolocation is off ⚠️</p>
      )}
      {isRetrying && <p className="text-yellow-500 text-xs">Retrying...🔁</p>}
      {isRejected && (
        <p className="text-red-500 text-xs">
          Geolocation was denied ⛔. We won't be able to deliverthe desired
          products to your location. You can get your products at{" "}
          <Link href="/" className="underline">
            Our location
          </Link>
        </p>
      )}
      {reachedTimeout && (
        <p className="text-red-500 text-xs">Geolocation timed out ❌</p>
      )}
      {isError && !isRejected && (
        <p className="text-red-500 text-xs">Failed to get your location ❌</p>
      )}
    </div>
  );
};

export default ValidationMessage;
