import React, { useState } from "react";
import { useEffect } from "react";
import { fetchEntityData } from "../../utils/RequestHandler";
import LoadingSpinner from "../Elements/LoadingSpinner";
import PaginatedActivities from "../Elements/PaginatedActivities";
import { useTranslation } from "react-i18next";
import {
  ActivitiesFormGroupWrapper,
  DaysContainer,
  DaysDisplay,
  DaysInput,
  Form,
  FormGroup,
  FormWrapper,
  Label,
  Select,
  SubmitButton,
} from "../../style/tourism.form.styles";

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
}) {
  const [countries, setCountries] = useState([]);
  const { t } = useTranslation("common");

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetchEntityData("countries");
        if (response.success) {
          setCountries(response.result);
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
            <Label>{t("where_to")}</Label>
            <Select
              value={formData.country}
              onChange={handleCountryChange}
              required
            >
              <option value="">{t("select_country")}</option>
              {countries.map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))}
            </Select>
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
