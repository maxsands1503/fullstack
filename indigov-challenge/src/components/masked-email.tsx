import React from "react";
import { EmailMaskProps } from "../types/interfaces/email-mask-props";

const EmailMask: React.FC<EmailMaskProps> = ({ email }) => {
    if(email === undefined || email === '') {
      return <></>;
    }
    const [localPart, domain] = email.split('@');

    if (localPart.length === 0) {
        throw new Error('Invalid email address');
    }

    const firstLetter = localPart[0]; // Get the first letter of the local part
    const maskedPart = '*'.repeat(localPart.length - 1); // Replace the rest with asterisks



  return <span>{`${firstLetter}${maskedPart}@${domain}`}</span>;
};

export default EmailMask;