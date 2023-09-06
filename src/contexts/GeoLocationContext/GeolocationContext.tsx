import { createContext, useEffect, useState } from "react";
import { GeolocationContextValues } from "./GeoLocationProvider";

const GeolocationContext = createContext<GeolocationContextValues>({} as GeolocationContextValues);

export default GeolocationContext;