import { Coordinates } from "@/types/Coordinates";
import { getDistance } from "geolib";

interface calculateDistanceCostParams {
  from: Coordinates | null;
  to: Coordinates | null;
  petrolPrice: number;
  carLitreConsumption: number;
}
export const calculateDistanceCost = ({
  from,
  to,
  petrolPrice,
  carLitreConsumption,
}: calculateDistanceCostParams) => {
  let petrolCost = 0;

  if (from && to) {
    const TWO_WAY_TRAVEL = 2;
    // const petrolPriceConsumption = (petrolPrice * carLitreConsumption) / 100;

    const distanceInMeters = getDistance(from, to);

    const distanceInKilometers = distanceInMeters / 1000;
    const petrolConsumption = (distanceInKilometers * carLitreConsumption) / 100;

    petrolCost =
    petrolConsumption * petrolPrice * TWO_WAY_TRAVEL;
    

    return Number(petrolCost.toFixed(2));
  } else {
    return Number(petrolCost.toFixed(2));
  }
};
