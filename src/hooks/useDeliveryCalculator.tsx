import GeolocationContext from "@/contexts/GeoLocationContext/GeolocationContext";
import { Coordinates } from "@/types/Coordinates";
import { calculateDistanceCost } from "@/utils/calculateDistanceCost";
import { useContext, useEffect, useState } from "react";

interface UseDeliveryCalculatorParams {
  destinationCoordinates: Coordinates | GeolocationCoordinates | null;
  userCoordinates: GeolocationCoordinates | null;
  petrolPrice: number;
  carLitreConsumption: number;
}
type UseDeliveryCalculatorHook = (params: UseDeliveryCalculatorParams) => {
  deliveryPrice: number;
};
export const useDeliveryCalculator: UseDeliveryCalculatorHook = ({
  destinationCoordinates,
  userCoordinates,
  petrolPrice,
  carLitreConsumption,
}) => {
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userCoordinates && destinationCoordinates) {
      const userLocation = {
        latitude: userCoordinates.latitude,
        longitude: userCoordinates.longitude,
      };
      const destination = {
        latitude: destinationCoordinates.latitude,
        longitude: destinationCoordinates.longitude,
      };
      const deliveryPriceValue = calculateDistanceCost({
        from: userLocation,
        to: destination,
        petrolPrice: petrolPrice,
        carLitreConsumption: carLitreConsumption,
      });
      setDeliveryPrice(deliveryPriceValue);
    } else {
      const deliveryPriceValue = calculateDistanceCost({
        from: null,
        to: null,
        petrolPrice: petrolPrice,
        carLitreConsumption: carLitreConsumption,
      });
      setDeliveryPrice(deliveryPriceValue);
    }
  }, [userCoordinates]);

  return {
    deliveryPrice,
  };
};
