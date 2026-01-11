import { useState } from "react";
import PersonalInfo from "./BookingSteps/PersonalInfo";
import Accommodation from "./BookingSteps/Accomodation";
import TransportMode from "./BookingSteps/TransportMode";
import StepIndicator from "./BookingSteps/StepIndicator";

export default function BookingWizard({
    onSubmit,
    isPersisting,
    itinerary,
    formData,
    setFormData,
}) {
    const [step, setStep] = useState(1);
    const next = () => setStep(s => Math.min(s + 1, 3));
    const back = () => setStep(s => Math.max(s - 1, 1));

    return (
        <>
            <StepIndicator current={step} />
            {step === 1 && (
                <PersonalInfo
                    formData={formData}
                    setFormData={setFormData}
                    onNext={next}
                    itinerary={itinerary}
                />
            )}

            {step === 2 && (
                <Accommodation
                    formData={formData}
                    setFormData={setFormData}
                    onNext={next}
                    onBack={back}
                />
            )}

            {step === 3 && (
                <TransportMode
                    formData={formData}
                    setFormData={setFormData}
                    onBack={back}
                    onSubmit={() => onSubmit(formData)}
                    isPersisting={isPersisting}
                />
            )}
        </>
    );
}
