import { useEffect, useState } from "react";

export const useGeolocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [isRejected, setIsRejected] = useState(false);
  const [coords, setCoords] = useState<GeolocationCoordinates | null>(null);
  const [errorMessage, setErrorMessage] = useState("No error");
  const [isError, setIsError] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [reachedTimeout, setReachedTimeout] = useState(false);

  function handleGeolocation(isOn: boolean) {
    setIsOn(isOn);
  }

  const MINUTES = 5;
  const milliseconds = MINUTES * 60 * 1000;

  const MAX_RETRIES = 3;
  let retryCount = 0;
  let retryTimeout: NodeJS.Timeout;

  const options = {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: milliseconds,
  };
  const handlePositionSuccess: PositionCallback = ({ coords }) => {
    if (coords) {
      setIsRetrying(false);
      setIsLoading(false);
      setCoords(coords);
    }
  };
  const handlePositionError: PositionErrorCallback = (error) => {
    setIsRetrying(false);
    setIsLoading(false);
    setCoords(null);
    setIsError(true);
    setErrorMessage(error.message);

    if (error.code === 1) {
      setIsRejected(true);
    }
    if (error.code === 2) {
      setIsSupported(false);
    }
    if (error.code === 3 && retryCount < MAX_RETRIES) {
      retryCount++;
      setReachedTimeout(true);
      setIsError(false);
      setErrorMessage("No Error");
      retryTimeout = setTimeout(() => {
        setReachedTimeout(false);
        setIsRetrying(true);
        retryGettingLocation();
      }, 3000);
    } else {
      //   clearTimeout(retryTimeout);
      setIsSupported(false);
    }
  };

  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      handlePositionSuccess,
      handlePositionError,
      options
    );
  }
  function retryGettingLocation() {
    if (retryTimeout) {
      clearTimeout(retryTimeout);
    }
    getLocation();
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }

    if (isOn && isSupported) {
      setIsError(false);
      setErrorMessage("No Error");
      setIsLoading(true);

      getLocation();
    } else {
      setCoords(null);
      setIsLoading(false);
    }
  }, [isOn]);

  const values = {
    isLoading,
    isSupported,
    coords,
    errorMessage,
    isError,
    isRetrying,
    isRejected,
    handleGeolocation,
    reachedTimeout,
  };

  return values;
};
