import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { fetchEntityData } from "../../utils/RequestHandler";
import LoadingSpinner from "../Elements/LoadingSpinner";
import PaginatedActivities from "../Elements/PaginatedActivities";
import { useTranslation } from "react-i18next";

export default function TouristForm({
  formData,
  setFormData,
  onFilterItineraries,
}) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      }
    };
    fetchData();
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
    if (formData.country && formData.activities?.length > 0) {
      onFilterItineraries(formData);
    }
  };

  const isFormValid = formData.country && formData.activities?.length > 0;

  return (
    <FormWrapper>
      {loading && <LoadingSpinner />}
      {!loading && (
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

          <FormGroup>
            <Label>
              {t("choose_adventure")} ({formData.activities?.length}{" "}
              {t("selected")})
            </Label>
            <PaginatedActivities
              formData={formData}
              setFormData={setFormData}
              handleActivityToggle={handleActivityToggle}
            />
          </FormGroup>

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

// Styled Components for TouristForm
const FormWrapper = styled.div`
  width: 100%;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-weight: 900;
  color: #ffffffff;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid #e1e8ed;
  border-radius: 12px;
  font-size: 16px;
  background: white;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border-color: #7e5b40;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const DaysContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const DaysInput = styled.input`
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: #e1e8ed;
  outline: none;

  /* WebKit browsers (Chrome, Safari, Edge) */
  &::-webkit-slider-track {
    height: 6px;
    border-radius: 3px;
    background: #7e5b40;
  }

  /* Firefox */
  &::-moz-range-track {
    height: 6px;
    border-radius: 3px;
    background: #7e5b40;
    border: none;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #7e5b40;
    cursor: pointer;
    border: 3px solid white;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  /* Firefox thumb */
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #7e5b40;
    cursor: pointer;
    border: 3px solid white;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
`;

const DaysDisplay = styled.div`
  background: #7e5b40;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 500;
  min-width: 80px;
  text-align: center;
`;

const SubmitButton = styled.button`
  padding: 14px 24px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${(props) => (props.valid ? "pointer" : "not-allowed")};
  background: ${(props) =>
    props.valid ? "linear-gradient(135deg, #10A969 0%, #0E5033 100%)" : "#ccc"};
  color: white;
  transition: all 0.3s ease;

  &:hover {
    transform: ${(props) => (props.valid ? "translateY(-2px)" : "none")};
    box-shadow: ${(props) =>
      props.valid ? "0 8px 25px rgba(234, 177, 102, 0.3)" : "none"};
  }
`;
