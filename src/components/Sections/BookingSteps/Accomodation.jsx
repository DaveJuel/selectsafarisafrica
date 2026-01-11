import {
  ButtonGroup,
  CancelButton,
  FormGroup,
  HotelCard,
  HotelDescription,
  HotelGrid,
  HotelStars,
  HotelTitle,
  LabelWithIcon,
  MealGrid,
  MealToggle,
  SubmitButton,
} from "../../../style/book.trip.modal.styles";

export default function Accommodation({ formData, setFormData, onNext, onBack }) {
  const hotelOptions = [
    {
      value: "budget",
      label: "Budget",
      stars: "⭐–⭐⭐",
      description: "Basic hotels, clean rooms, essential comfort",
    },
    {
      value: "mid",
      label: "Mid-range",
      stars: "⭐⭐⭐–⭐⭐⭐⭐",
      description: "Comfortable hotels with good amenities",
    },
    {
      value: "luxury",
      label: "Luxury",
      stars: "⭐⭐⭐⭐⭐",
      description: "Premium lodges, top service & experience",
    },
  ];

  const toggleMeal = (meal) => {
    setFormData((prev) => ({
      ...prev,
      meal_plan: prev?.meal_plan?.includes(meal)
        ? prev?.meal_plan.filter((m) => m !== meal)
        : [...prev?.meal_plan, meal],
    }));
  };

  return (
    <>
      {/* Hotel level */}
      <FormGroup>
        <HotelGrid>
          {hotelOptions.map((level) => {
            const active = formData.accomodation_type === level.value;

            return (
              <HotelCard
                key={level.value}
                active={active}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    accomodation_type: level.value,
                  }))
                }
              >
                <HotelTitle>{level.label}</HotelTitle>
                <HotelStars>{level.stars}</HotelStars>
                <HotelDescription>{level.description}</HotelDescription>
              </HotelCard>
            );
          })}
        </HotelGrid>
      </FormGroup>

      {/* Meals */}
      <FormGroup>
        <LabelWithIcon>Meals Included</LabelWithIcon>

        <MealGrid> 
          {["breakfast", "lunch", "dinner"].map((meal) => (
            <MealToggle
              key={meal}
              active={formData.meal_plan?.includes(meal)}
              onClick={() => toggleMeal(meal)}
            >
              {meal}
            </MealToggle>
          ))}
        </MealGrid>
      </FormGroup>

      <ButtonGroup>
        <CancelButton onClick={onBack}>Back</CancelButton>
        <SubmitButton onClick={onNext}>Next</SubmitButton>
      </ButtonGroup>
    </>
  );
}
