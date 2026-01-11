import {
  ButtonGroup,
  CancelButton,
  FormGroup,
  IconWrapper,
  LabelWithIcon,
  SubmitButton,
  TransportCard,
  TransportDescription,
  TransportGrid,
  TransportTitle,
} from "../../../style/book.trip.modal.styles";

export default function TransportMode({
  formData,
  setFormData,
  onBack,
  onSubmit,
  isPersisting,
}) {
  const transportOptions = [
    {
      value: "tourist",
      label: "Tourist Vehicle",
      description: "Comfortable Safari, ideal for long-distance travel & Safaris Trips",
      icon: "/icons/safari-car.png",
    },
    {
      value: "jeep",
      label: "Jeep / 4x4",
      description: "Best for off-road, city, and adventure terrain",
      icon: "/icons/jeep.png",
    },
  ];

  return (
    <>
      <FormGroup>
        <LabelWithIcon>Transport Choice</LabelWithIcon>

        <TransportGrid>
          {transportOptions.map((option) => {
            const active = formData.transport_mode === option.value;

            return (
              <TransportCard
                key={option.value}
                active={active}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    transport_mode: option.value,
                  }))
                }
              >
                <IconWrapper>
                  <img src={option.icon} alt={option.label} />
                </IconWrapper>

                <TransportTitle>{option.label}</TransportTitle>
                <TransportDescription>{option.description}</TransportDescription>
              </TransportCard>
            );
          })}
        </TransportGrid>
      </FormGroup>

      <ButtonGroup>
        <CancelButton onClick={onBack}>Back</CancelButton>
        <SubmitButton
          disabled={!formData.transport_mode || isPersisting}
          onClick={onSubmit}
        >
          Confirm Booking
        </SubmitButton>
      </ButtonGroup>
    </>
  );
}
