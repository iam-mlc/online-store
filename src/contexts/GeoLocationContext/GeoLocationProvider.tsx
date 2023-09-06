import { useGeolocation } from "@/hooks/useGeolocation";
import GeolocationContext from "./GeolocationContext";
import { Coordinates } from "@/types/Coordinates";

interface GeolocationProviderProps {
  children: React.ReactNode;
}
export interface GeolocationContextValues {
  isLoading: boolean;
  isSupported: boolean;
  coords: GeolocationCoordinates | null;
  errorMessage: string;
  isError: boolean;
  isRetrying: boolean;
  isRejected: boolean;
  handleGeolocation: (isOn: boolean) => void;
  reachedTimeout: boolean;
  STORE_LOCATION: Coordinates;
}



const STORE_LOCATION = {
  latitude: 0,
  longitude: 0,
};



const GeolocationProvider: React.FC<GeolocationProviderProps>  = ({ children }) => {
  const {
    coords,
    errorMessage,
    isError,
    isLoading,
    isSupported,
    isRetrying,
    isRejected,
    handleGeolocation,
    reachedTimeout,
  } = useGeolocation();

  const values: GeolocationContextValues = {
    isLoading,
    isSupported,
    coords,
    errorMessage,
    isError,
    isRetrying,
    isRejected,
    handleGeolocation,
    reachedTimeout,
    STORE_LOCATION
  };
  return (
    <GeolocationContext.Provider value={values}>
      {children}
    </GeolocationContext.Provider>
  );
};

export default GeolocationProvider;
