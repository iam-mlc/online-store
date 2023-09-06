import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import ProductsProvider from "@/contexts/ProductsContext/ProductsProvider";
import { CartProvider } from "@/contexts/CartContext/CartProvider";
import Layout from "@/components/Layout";
import Router, { useRouter } from "next/router";
import ProgressBar from "@badrap/bar-of-progress";
import * as Toast from "@radix-ui/react-toast";
import GeolocationProvider from "@/contexts/GeoLocationContext/GeoLocationProvider";
import LocaleProvider from "@/contexts/LocaleContext/LocaleProvider";
import OrderSummaryProvider from "@/contexts/OrderContext/OrderSummaryProvider";

const queryClient = new QueryClient();

const progress = new ProgressBar({
  size: 4, // height of the progress bar
  color: "#29D", // color of the progress bar
  className: "z-50", // class applied to the progress bar
  delay: 100, // delay in ms after which the progress bar will appear during navigation
});

// events on which to start/stop the progress bar
Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

export default function App({ Component, pageProps }: AppProps) {

  // const router = useRouter()

  // console.log(router)
  return (
    <QueryClientProvider client={queryClient}>
      <Toast.Provider swipeDirection="right">
        <LocaleProvider>
          <ProductsProvider>
            <CartProvider>
              <GeolocationProvider>
                <OrderSummaryProvider>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </OrderSummaryProvider>
              </GeolocationProvider>
            </CartProvider>
          </ProductsProvider>
        </LocaleProvider>
      </Toast.Provider>
    </QueryClientProvider>
  );
}
