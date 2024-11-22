import { InputFieldErrorProps } from "../types/interfaces/input-field-error-props";

export const InputFieldError: React.FC<InputFieldErrorProps> = ({ message }) => {
    return message ? <p className="error">{message}</p> : <></>
}