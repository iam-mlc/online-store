import { useContext, useEffect, useState } from "react";
import GeolocationContext from "@/contexts/GeoLocationContext/GeolocationContext";
import { Field } from "formik";
import ValidationMessage from "./ValidationMessage";
import { CartContext } from "@/contexts/CartContext/cartContext";

type RadioInputProps = {};
interface LabelProps {
  value: string;
  disabled: boolean;
  isChecked: (isChecked: boolean) => void;
}

const RadioInput: React.FC<RadioInputProps> = ({}) => {
  const [makeDelivery, setMakeDelivery] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { cartData } = useContext(CartContext);
  let successTimeout: NodeJS.Timeout;

  const {
    coords,
    isSupported,
    handleGeolocation,
  } = useContext(GeolocationContext);

  const handleMakeDelivery = (isOn: boolean) => {
    setMakeDelivery(isOn);
    handleGeolocation(isOn);
  };

  useEffect(() => {
    if (coords) {
      setShowSuccess(true);
      successTimeout = setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    }
  }, [coords]);

  return (
    <div className="flex flex-col gap-2">
      <p>Would you like to receive a delivery of our product ?</p>
      <div
        role="group"
        aria-labelledby="delivery-radio-group"
        className="flex gap-4"
      >
        <Label
          value="Yes"
          disabled={!isSupported || cartData.totalItems < 3}
          isChecked={handleMakeDelivery}
        />
        <Label
          value="No"
          disabled={!isSupported || cartData.totalItems < 3}
          isChecked={handleMakeDelivery}
        />
      </div>
      <ValidationMessage canDisplayMessage={makeDelivery} />
    </div>
  );
};

const Label: React.FC<LabelProps> = ({ value, disabled, isChecked }) => {
  return (
    <label className="flex gap-3 cursor-pointer">
      <Field
        type="radio"
        name="delivery"
        value={value}
        disabled={disabled}
        innerRef={(element: HTMLInputElement) => {
          if (element && element.checked) {
            switch (element.value) {
              case "Yes":
                isChecked(element.checked);

                break;

              case "No":
                isChecked(!element.checked);

              default:
                break;
            }
          }
        }}
      />
      <span>{value}</span>
    </label>
  );
};

export default RadioInput;
