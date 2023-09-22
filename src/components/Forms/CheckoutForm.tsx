import {
  FieldInputProps,
  FieldMetaProps,
  Form,
  Formik,
  FormikProps,
} from "formik";
import initialValues from "./helpers/validationSchema/initialValues";
import checkoutSchema from "./helpers/validationSchema/schema";
import { CartContext } from "@/contexts/CartContext/cartContext";
import { useContext } from "react";
import { CartContextValues } from "@/contexts/CartContext/CartProvider";
import GeolocationContext from "@/contexts/GeoLocationContext/GeolocationContext";
import TextInput from "./TextInput/TextInput";
import PhoneNumberInput from "./PhoneNumberInput/PhoneNumberInput";
import EmailInput from "./EmailInput/EmailInput";
import FormInput from "./Input/FormInput";
import RadioInput from "./RadioInput/RadioInput";
import LocaleContext from "@/contexts/LocaleContext/LocaleContext";
import UnorderedList from "../UnorderedList/UnorderedList";
import OrderSummaryContext from "@/contexts/OrderContext/OrderSummaryContext";
import { timeStamp } from "@/utils/currentDate";

export interface FormProps {}

interface FormSubmitButtonProps {
  isDisabled: boolean;
}

export interface RenderProps {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
  meta: FieldMetaProps<any>;
}

const CheckoutForm: React.FC<FormProps> = ({}) => {
  const { coords } = useContext(GeolocationContext);
  const { COUNTRY_CODE, LANGUANGE_CODE } = useContext(LocaleContext);
  const locale = `${LANGUANGE_CODE}-${COUNTRY_CODE}`;
  const { order } = useContext(OrderSummaryContext);

  const errorMessage = (msg: string) => {
    return (
      <>
        <p className="text-[0.8em] text-red-600">{msg}</p>
      </>
    );
  };
  const notes = [
    "We only make deliveries within the city.",
    "Delivery will incur costs starting at a distance of 1km from the store ",
  ].map((item, index) => {
    return {
      label: `Note-${index}`,
      component: <p className="text-sm text-gray-500">{item}</p>,
    };
  });

  return (
    <div className="p-8">
      <div className="mb-12  flex flex-col gap-2">
        <h2 className="text-gray-500">IMPORTANT NOTES:</h2>
        <UnorderedList
          items={notes}
          itemClassName=""
          listClassName="list-disc ml-5"
        />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        onSubmit={(values, { setSubmitting }) => {
          let userLocation;
          if (coords) {
            userLocation = {
              latitude: coords.latitude,
              longitude: coords.longitude,
            };
          }
          const userData = {
            ...values,
            location: userLocation,
          };
          const data = {
            timeStamp: timeStamp(locale),
            user: userData,
            order,
          };

          const payload = JSON.stringify(data, null, 2);

          alert(payload);
          console.log(payload);
        }}
      >
        {({ isValid }) => (
          <Form className="flex flex-col gap-8">
            <FormInput
              label="First Name"
              receivesComponent={TextInput}
              hasPlaceholder={true}
              handleErrorMessage={errorMessage}
            />
            <FormInput
              label="Last Name"
              receivesComponent={TextInput}
              hasPlaceholder={true}
              handleErrorMessage={errorMessage}
            />
            <FormInput
              label="Phone Number"
              receivesComponent={PhoneNumberInput}
              hasPlaceholder={true}
              handleErrorMessage={errorMessage}
              hasNote="(Mozambican phone number only)"
            />
            <FormInput
              label="Email"
              hasPlaceholder={true}
              handleErrorMessage={errorMessage}
              receivesComponent={EmailInput}
            />

            <RadioInput />

            <div className="flex gap-8 mt-6 items-center">
              <FormSubmitButton isDisabled={!isValid} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({ isDisabled }) => {
  return (
    <button
      type="submit"
      className="w-fit font-bold text-white  py-2 px-8 rounded-full inline-block bg-black/[.40] hover:bg-black/[.60] text-center opacity-100 data-[disabled=true]:opacity-20"
      disabled={isDisabled}
      aria-disabled={isDisabled}
      data-disabled={isDisabled}
    >
      Submit
    </button>
  );
};



export default CheckoutForm;
