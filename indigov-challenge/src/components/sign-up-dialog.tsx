import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react"
import { AddConstituentForm } from "../types/add-constituent-form.type";
import { PartyAffiliationEnum } from "../types/party-affiliation.enum";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { useAxios } from "../axios/useAxios";
import { requests, RequestKeysEnum } from '../axios/requests';
import { Constituent } from "../types/constituent.type";
import { FormField } from "../types/form-field.type";
import { stateAbbreviations } from "../stateAbbreviations";
import { InputFieldError } from "./input-field-error";

export const SignUpDialog: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
    const [visible, setVisible] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formFieldsEmpty, setFieldsAreEmpty] = useState(true);
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: '',
        email: '',
        address1: '',
        address2: '',
        state: '',
        city: '',
        county: '',
        zipCode: '',
        phoneNumber: '',
        partyAffiliation: '',
        dateOfBirth: ''
    });
    const [hasErrors, setHasErrors] = useState(false);
    const [formData, setFormData] = useState<AddConstituentForm>(
        {
            firstName: '',
            lastName: '',
            email: '',
            address1: '',
            address2: '',
            state: '',
            city: '',
            county: '',
            zipCode: '',
            phoneNumber: '',
            dateOfBirth: null,
            partyAffiliation: null
        });

    const stringFields: FormField = {
        firstName: "First Name",
        lastName: "Last Name",
        address1: 'Address',
        city: 'City',
        county: 'County',
        zipCode: 'Zip Code',
    };

    const resetAll = () => {
        setSubmitting(false);
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            address1: '',
            address2: '',
            state: '',
            city: '',
            county: '',
            zipCode: '',
            phoneNumber: '',
            dateOfBirth: null,
            partyAffiliation: null
        });
        setErrors({
            firstName: "",
            lastName: '',
            email: '',
            address1: '',
            address2: '',
            state: '',
            city: '',
            county: '',
            zipCode: '',
            phoneNumber: '',
            partyAffiliation: '',
            dateOfBirth: ''
        });
    }

    const partyAffiliationOptions = [
        PartyAffiliationEnum.DEMOCRAT,
        PartyAffiliationEnum.REPUBLICAN,
        PartyAffiliationEnum.INDEPENDENT,
        PartyAffiliationEnum.LIBERTARIAN,
        PartyAffiliationEnum.GREEN,
        PartyAffiliationEnum.OTHER,
        PartyAffiliationEnum.NONE
    ];
    const request = { ...requests[RequestKeysEnum.CreateConstituent] };
    const { execute, loading, error } = useAxios<Constituent>(request, true);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        validateField(name, value)
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDateChange = (e: any) => {
        setFormData({
            ...formData,
            dateOfBirth: e.value, // Update the date field
        });

        setErrors((prev) => ({
            ...prev,
            dateOfBirth: '',
        }));
    };

    const handlePartyChange = (e: any) => {
        setFormData({
            ...formData,
            partyAffiliation: PartyAffiliationEnum[e.value as keyof typeof PartyAffiliationEnum],
        });

        setErrors((prev) => ({
            ...prev,
            partyAffiliation: '',
        }));
    };

    const handleStateChange = (e: any) => {
        setFormData({
            ...formData,
            state: e.value,
        });

        setErrors((prev) => ({
            ...prev,
            state: '',
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        request.payload = formData
        try {
            setSubmitting(true);
            await execute(); // Trigger the Axios request
            setVisible(false);
            resetAll();
            onSuccess();
        } catch (err) {
            console.error("Error Submitting Form:", error || err);
        }
    };

    const allFieldsHaveValue = () => {

        const requiredFields = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            address1: formData.address1,
            state: formData.state,
            city: formData.city,
            county: formData.county,
            zipCode: formData.zipCode,
            phoneNumber: formData.phoneNumber,
            dateOfBirth: formData.dateOfBirth,
            partyAffiliation: formData.partyAffiliation
        }

        return Object.values(requiredFields).every(
            (field) => {
                return (field !== undefined && field !== null && field !== '')
            }
        );
    }

    useEffect(() => {
        const allFieldsFilled = allFieldsHaveValue()
        setFieldsAreEmpty(!allFieldsFilled)

    }, [formData])

    const validateField = (fieldName: string, value: string) => {
        let error = "";
        if (fieldName === 'email') {
            validateEmail(value);
            return;
        }
        if (fieldName === 'phoneNumber') {
            validatePhoneNumber(value);
            return;
        }
        if (fieldName === 'zipCode') {
            validateZipCode(value);
            return;
        }

        if (!value.trim() && fieldName !== 'address2') {
            error = `${stringFields[fieldName]} is required.`
        } else if (value.length < 2 && fieldName !== 'address2') {
            error = `${stringFields[fieldName]} must be at least 2 characters.`
        } else if (value.length > 50) {
            error = `${stringFields[fieldName]} must not exceed 50 characters.`
        } else if (!/^[A-Za-z0-9]+$/.test(value) && fieldName !== 'address1' && fieldName !== 'address2') {
            error = `${stringFields[fieldName]} can only contain alphabetic characters.`
        }

        setErrors((prev) => ({
            ...prev,
            [fieldName]: error,
        }));

        checkForErrors();
    };

    const validateEmail = (email: string) => {
        let error = '';
        if (!email.includes("@")) {
            error = "Email must include an '@' symbol."
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            error = "Email format is invalid."
        }
        setErrors((prev) => ({
            ...prev,
            email: error,
        }));
        checkForErrors();
    }

    const validatePhoneNumber = (phoneNumber: string) => {
        let error = '';
        if (phoneNumber.length != 10) {
            error = 'Phone Number must 10 digits long';
        }
        setErrors((prev) => ({
            ...prev,
            phoneNumber: error,
        }));
        checkForErrors();
    }

    const validateZipCode = (zipCode: string) => {
        let error = '';
        const zipCodeRegex = /^\d{5}(-\d{4})?$/;
        if (!zipCodeRegex.test(zipCode)) {
            error = 'Invalid Zip Code'
        }
        setErrors((prev) => ({
            ...prev,
            zipCode: error,
        }));

        checkForErrors()

    }

    const checkForErrors = () => {
        const allFieldsFilled = allFieldsHaveValue();

        if (!allFieldsFilled) {
            if (formData['dateOfBirth'] === null) {
                setErrors((prev) => ({
                    ...prev,
                    dateOfBirth: 'Date of Birth is Required',
                }));
            } if (formData['state'] === null) {
                setErrors((prev) => ({
                    ...prev,
                    state: 'State is Required',
                }));
            } if (formData['partyAffiliation'] === null) {
                setErrors((prev) => ({
                    ...prev,
                    partyAffiliation: 'Party is Required',
                }));
            }
        }


        const hasErrors = Object.values(errors).every(
            (field) => {
                return (field !== undefined && field !== null && field !== "")
            }
        );

        setHasErrors(hasErrors);
    }

    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <h2>Please Enter Your Information</h2>
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Button label="Add Constituent" icon="pi pi-plus" onClick={() => setVisible(true)} />
            <Dialog header={headerElement} visible={visible} modal style={{ width: '50rem' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                <form onSubmit={handleSubmit}>
                    <div className={'row mt-6'}>
                        <div className="column">
                            <label htmlFor="firstName">First Name</label>
                            <InputText type="text" style={{ width: "95%" }} name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} invalid={errors['firstName'] !== ''} />
                            <InputFieldError message={errors['firstName']} />
                        </div>
                        <div className="column">
                            <label htmlFor="lastName" style={{ marginLeft: '5%' }}>Last Name</label>
                            <InputText type="text" style={{ width: "95%", marginLeft: '5%' }} name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} invalid={errors['lastName'] !== ''} />
                            <InputFieldError message={errors['lastName']} />
                        </div>
                    </div>
                    <div className={'row mt-6'}>
                        <div className="column">
                            <label htmlFor="email">Email</label>
                            <InputText type="text" style={{ width: "95%" }} name="email" placeholder="Email" value={formData.email} onChange={handleChange} invalid={errors['email'] !== ''} />
                            <InputFieldError message={errors['email']} />
                        </div>
                        <div className="column">
                            <label htmlFor="phoneNumber" style={{ marginLeft: '5%' }}>Phone Number</label>
                            <InputText type="text" style={{ width: "95%", marginLeft: '5%' }} name="phoneNumber" placeholder="Phone Numer" value={formData.phoneNumber} onChange={handleChange} invalid={errors['phoneNumber'] !== ''} />
                            <InputFieldError message={errors['phoneNumber']} />
                        </div>
                    </div>
                    <div className={'row mt-6'}>
                        <span style={{ width: '100%' }}>
                            <label htmlFor="address1">Address</label>
                            <InputText type="text" style={{ width: "100%", margin: '0 auto' }} name="address1" placeholder="Address" value={formData.address1} onChange={handleChange} invalid={errors['address1'] !== ''} />
                            <InputFieldError message={errors['address1']} />
                        </span>
                    </div>
                    <div className={'row mt-6'}>
                        <span style={{ width: '100%' }}>
                            <label htmlFor="address2">Address 2</label>
                            <InputText type="text" style={{ width: "100%", margin: '0 auto' }} name="address2" placeholder="Address 2" value={formData.address2} onChange={handleChange} />
                            <InputFieldError message={errors['address2']} />
                        </span>
                    </div>
                    <div className={'row mt-6'}>
                        <div className="column">
                            <label htmlFor="city">City</label>
                            <InputText type="text" name="city" style={{ width: "95%" }} placeholder="City" value={formData.city} onChange={handleChange} invalid={errors['city'] !== ''} />
                            <InputFieldError message={errors['city']} />
                        </div>
                        <div className="column">
                            <label htmlFor="state">State</label>
                            <Dropdown
                                style={{ width: "95%" }}
                                value={formData.state}
                                onChange={handleStateChange}
                                options={stateAbbreviations}
                                optionLabel="name"
                                placeholder="State"
                                className="w-full md:w-14rem"
                                inputId="dd-state"
                            />
                            <InputFieldError message={errors['state']} />
                        </div>
                        <div className="column">
                            <label htmlFor="zipCode">Zip Code</label>
                            <InputText type="text" name="zipCode" style={{ width: "95%" }} placeholder="Zip Code" value={formData.zipCode} onChange={handleChange} invalid={errors['zipCode'] !== ''} />
                            <InputFieldError message={errors['zipCode']} />
                        </div>
                    </div>
                    <div className={'row mt-6'}>
                        <div className="column">
                            <label htmlFor="county">County</label>
                            <InputText type="text" name="county" style={{ width: "95%" }} placeholder="County" value={formData.county} onChange={handleChange} invalid={errors['county'] !== ''} />
                            <InputFieldError message={errors['county']} />
                        </div>
                        <div className="column">
                            <label htmlFor="dateOfBirth">Date of Birth</label>
                            <Calendar style={{ width: "95%" }} placeholder="Date of Birth" inputId="birth_date" value={formData.dateOfBirth} onChange={handleDateChange} dateFormat="mm/dd/yy" />
                            <InputFieldError message={errors['dateOfBirth']} />
                        </div>
                        <div className="column">
                            <label htmlFor="partyAffiliation">Registered As</label>
                            <Dropdown
                                style={{ width: "95%" }}
                                value={formData.partyAffiliation}
                                onChange={handlePartyChange}
                                options={partyAffiliationOptions}
                                optionLabel="name"
                                placeholder="Registered As"
                                className="w-full md:w-14rem"
                                inputId="dd-party"
                            />
                            <InputFieldError message={errors['partyAffiliation']} />
                        </div>
                    </div>
                    <div className={'row mt-6'}>
                        <Button type="submit" label={submitting ? 'Submitting... ' : 'Submit'} disabled={hasErrors || formFieldsEmpty || submitting} />
                    </div>
                </form>
            </Dialog>
        </div>
    )


}