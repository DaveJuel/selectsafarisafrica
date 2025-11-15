import { useState } from "react";
import { useEffect } from "react";
import { fetchEntityTranslatedData } from "../../utils/RequestHandler";
import LoadingSpinner from "../Elements/LoadingSpinner";
import PaginatedActivities from "../Elements/PaginatedActivities";
import { useTranslation } from "react-i18next";
import {
  ActivitiesFormGroupWrapper,
  ButtonGroupWrapper,
  CountryButton,
  DaysContainer,
  DaysDisplay,
  DaysInput,
  Form,
  FormGroup,
  FormGroupHeader,
  FormGroupHeaderButton,
  FormGroupIconWrapper,
  FormWrapper,
  Label,
  SubmitButton,
} from "../../style/tourism.form.styles";
import { FaGlobe } from "react-icons/fa";

export default function TouristForm({
  formData,
  setFormData,
  onFilterItineraries,
  allActivities,
  setAllActivities,
  activities,
  setActivities,
  loadingSidebar,
  setLoadingSidebar,
  language,
  showLanguageModal
}) {
  const [countries, setCountries] = useState([]);
  const { t } = useTranslation("common");

  useEffect(() => {
    if (!language) return;
    const fetchCollections = async () => {
      try {
        const landCode = localStorage.getItem("app_language");
        const response = await fetchEntityTranslatedData("countries", landCode);
        if (response.success) {
          setCountries(Array.isArray(response.result) ? response.result : []);
          const defaultCountry = response.result[0];
          if (defaultCountry) {
            setFormData((prev) => ({
              ...prev,
              country: defaultCountry.name,
            }));
          }
        }
      } catch (error) {
        console.error(`Failed to fetch countries`, error);
      }
    };

    const fetchData = async () => {
      try {
        fetchCollections();
      } catch (error) {
        console.error(`Failed to fetch countries`, error);
      } finally {
        setLoadingSidebar(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCountryChange = (e) => {
    setFormData((prev) => ({ ...prev, country: e.target.value }));
  };

  const handleDaysChange = (e) => {
    setFormData((prev) => ({ ...prev, days: parseInt(e.target.value) }));
  };

  const handleActivityToggle = (activity) => {
    setFormData((prev) => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter((a) => a !== activity)
        : [...prev.activities, activity],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.country && formData.days) {
      onFilterItineraries(formData);
    }
  };

  const isFormValid = formData.country && formData.days;

  return (
    <FormWrapper>
      {loadingSidebar && <LoadingSpinner />}
      {!loadingSidebar && (
        <Form>
          <FormGroup>
            <FormGroupHeader>
              <Label>{t("where_to")}</Label>

              <FormGroupHeaderButton type="button" onClick={() => showLanguageModal()}>
                <FormGroupIconWrapper><FaGlobe /></FormGroupIconWrapper>
              </FormGroupHeaderButton>
            </FormGroupHeader>
            <ButtonGroupWrapper>
              {countries.map((country) => {
                const selected = formData.country === country.name;

                return (
                  <CountryButton
                    key={country.id}
                    type="button"
                    $selected={selected}
                    onClick={() =>
                      handleCountryChange({
                        target: { value: country.name },
                      })
                    }
                  >
                    {country.name}
                  </CountryButton>
                );
              })}
            </ButtonGroupWrapper>
          </FormGroup>

          <FormGroup>
            <Label>{t("days_away")}</Label>
            <DaysContainer>
              <DaysInput
                type="range"
                min="1"
                max="14"
                value={formData.days}
                onChange={handleDaysChange}
              />
              <DaysDisplay>
                {formData.days} {formData.days === 1 ? t("day") : t("days")}
              </DaysDisplay>
            </DaysContainer>
          </FormGroup>
          <ActivitiesFormGroupWrapper>
            <FormGroup>
              <Label>
                {t("choose_adventure")} ({formData.activities?.length}{" "}
                {t("selected")})
              </Label>
              <PaginatedActivities
                formData={formData}
                setFormData={setFormData}
                handleActivityToggle={handleActivityToggle}
                allActivities={allActivities}
                setAllActivities={setAllActivities}
                activities={activities}
                setActivities={setActivities}
                language={language}
              />
            </FormGroup>
          </ActivitiesFormGroupWrapper>
          <SubmitButton
            disabled={!isFormValid}
            valid={isFormValid}
            onClick={handleSubmit}
          >
            {t("make_it_happen")}
          </SubmitButton>
        </Form>
      )}
    </FormWrapper>
  );
}
