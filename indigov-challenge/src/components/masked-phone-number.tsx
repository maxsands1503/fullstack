import React from "react";
import { PhoneNumberMaskProps } from "../types/interfaces/phone-number-mask.props";

const PhoneNumberMask: React.FC<PhoneNumberMaskProps> = ({ phoneNumber }) => {
  // Extract the last 4 digits
  const maskedNumber =
    phoneNumber.length >= 4
      ? `******${phoneNumber.slice(-4)}`
      : "Invalid phone number";

  return <span>{maskedNumber}</span>;
};

export default PhoneNumberMask;