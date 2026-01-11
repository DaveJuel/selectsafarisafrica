import { useState } from "react";
import { getTodayDateISO } from "../../../utils/DataHandler";
import { FiCalendar, FiMail, FiMap, FiUser } from "react-icons/fi";
import { BiChat } from "react-icons/bi";
import {
  ButtonGroup,
  CancelButton,
  ErrorMessage,
  FormGroup,
  Input,
  InputWrapper,
  LabelWithCheckbox,
  LabelWithIcon,
  Select,
  SubmitButton,
  ToggleButton,
  ToggleContainer,
} from "../../../style/book.trip.modal.styles";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../../Elements/LoadingSpinner";

export default function PersonalInfo({
  onClose,
  onNext,
  itinerary,
  isPersisting,
  formData,
  setFormData,
  loading,
}) {
    const [contactMethod, setContactMethod] = useState("email");
    const [termsAccepted, setTermsAccepted] = useState(false);

    const { t } = useTranslation("booking_form");

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        // e.preventDefault();
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.client_name?.trim()) {
            newErrors.client_name = "name_required";
        }

        if (!formData.client_contact.trim()) {
            newErrors.client_contact =
                contactMethod === "email"
                    ? "email_required"
                    : "whatsapp_required";
        } else if (contactMethod === "email") {
            if (!/\S+@\S+\.\S+/.test(formData.client_contact)) {
                newErrors.client_contact = "enter_valid_email";
            }
        } else if (contactMethod === "whatsapp") {
            if (!/^\+?[0-9]{7,15}$/.test(formData.client_contact)) {
                newErrors.client_contact =
                    "enter_valid_whatsapp";
            }
        }

        if (!formData.trip_start_date) {
            newErrors.trip_start_date = "start_date_required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleContactMethodChange = (method) => {
        setContactMethod(method);
        setErrors({});
    };

    const handleCheckboxChange = (e) => {
        setTermsAccepted(e.target.checked);
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onNext();
        }
    };

    if(loading) return <LoadingSpinner />;

    return (
        <form onSubmit={handleNext}>
            <FormGroup>
                <LabelWithIcon>
                    <>
                        <FiUser size={16} />
                        {t("your_name")}
                    </>
                </LabelWithIcon>
                <Input
                    type="text"
                    name="client_name"
                    value={formData.client_name}
                    onChange={handleInputChange}
                    onInput={handleInputChange}
                    onBlur={handleInputChange}
                    placeholder={t("enter_fullname")}
                    hasError={!!errors.client_name}
                />
                {errors.client_name && (
                    <ErrorMessage>{t(errors.client_name)}</ErrorMessage>
                )}
            </FormGroup>
            <FormGroup>
                <LabelWithIcon>
                    <>
                        <FiMail size={16} />
                        {t("reach_out_method")}
                    </>
                </LabelWithIcon>
                <ToggleContainer>
                    <ToggleButton
                        type="button"
                        active={contactMethod === "email"}
                        method="email"
                        onClick={() => handleContactMethodChange("email")}
                    >
                        <FiMail size={18} />
                        {t("email")}
                    </ToggleButton>

                    <ToggleButton
                        type="button"
                        active={contactMethod === "whatsapp"}
                        method="whatsapp"
                        onClick={() => handleContactMethodChange("whatsapp")}
                    >
                        <BiChat size={18} />
                        {t("whatsapp")}
                    </ToggleButton>
                </ToggleContainer>
            </FormGroup>

            {/* Input Field */}
            <FormGroup>
                <InputWrapper>
                    <Input
                        type={contactMethod === "email" ? "email" : "tel"}
                        name="client_contact"
                        value={formData.client_contact}
                        onChange={handleInputChange}
                        onInput={handleInputChange}
                        placeholder={
                            contactMethod === "email"
                                ? t("enter_email")
                                : t("enter_whatsapp")
                        }
                        hasError={!!errors.client_contact}
                    />
                </InputWrapper>

                {errors.client_contact && (
                    <ErrorMessage>⚠️ {t(errors.client_contact)}</ErrorMessage>
                )}
            </FormGroup>

            <FormGroup>
                <LabelWithIcon>
                    <>
                        <FiCalendar size={16} />
                        {t("start_time")}
                    </>
                </LabelWithIcon>
                <Input
                    type="date"
                    name="trip_start_date"
                    value={formData.trip_start_date}
                    onChange={handleInputChange}
                    onInput={handleInputChange}
                    hasError={!!errors.trip_start_date}
                    min={getTodayDateISO()}
                />
                {errors.trip_start_date && (
                    <ErrorMessage>{t(errors.trip_start_date)}</ErrorMessage>
                )}
            </FormGroup>

            <FormGroup>
                <LabelWithIcon>
                    <>
                        <FiMap size={16} />
                        {t("origin")}
                    </>
                </LabelWithIcon>
                <Select
                    name="country_of_origin"
                    value={formData.country_of_origin}
                    onChange={handleInputChange}
                    onInput={handleInputChange}
                    hasError={!!errors.country_of_origin}
                >
                    <option value="">{t("select_country")}</option>
                    <option value="US">{t("country_us")}</option>
                    <option value="UK">{t("country_uk")}</option>
                    <option value="CA">{t("country_ca")}</option>
                    <option value="AU">{t("country_au")}</option>
                    <option value="DE">{t("country_de")}</option>
                    <option value="FR">{t("country_fr")}</option>
                    <option value="IT">{t("country_it")}</option>
                    <option value="ES">{t("country_es")}</option>
                    <option value="JP">{t("country_jp")}</option>
                    <option value="CN">{t("country_cn")}</option>
                    <option value="IN">{t("country_in")}</option>
                    <option value="BR">{t("country_br")}</option>
                    <option value="MX">{t("country_mx")}</option>
                    <option value="ZA">{t("country_za")}</option>
                    <option value="OTHER">{t("country_other")}</option>
                </Select>
                {errors.country_of_origin && (
                    <ErrorMessage>{t(errors.country_of_origin)}</ErrorMessage>
                )}
            </FormGroup>
            <FormGroup>
                <LabelWithCheckbox>
                    <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={handleCheckboxChange}
                    />
                    <span>
                        {t("accept_terms_prefix")}{" "}
                        <a
                            href="/terms-and-conditions"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {t("terms_and_conditions")}
                        </a>{" "}
                        {t("accept_terms_and")}{" "}
                        <a
                            href="/cancellation-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {t("cancellation_policy")}
                        </a>
                    </span>
                </LabelWithCheckbox>
            </FormGroup>
            <ButtonGroup>
                <CancelButton type="button" onClick={onClose}>
                    {t("cancel_button")}
                </CancelButton>
                <SubmitButton
                    type="submit"
                    disabled={!termsAccepted || isPersisting || !itinerary.id}
                >
                    {t("next_button")}
                </SubmitButton>
            </ButtonGroup>
        </form>
    )
}