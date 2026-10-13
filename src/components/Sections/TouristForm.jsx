import { useState, useEffect } from "react";
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

function useMediaQuery(query) {
  const getMatch = () =>
    typeof window !== "undefined" && window.matchMedia(query).matches;

  const [matches, setMatches] = useState(getMatch);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mql.matches);

    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange); // older Safari

    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, [query]);

  return matches;
}

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
  const isMobile = useMediaQuery("(max-width: 768px)");

  // useEffect(() => {
  //   if (!language) return;
  //   const fetchCollections = async () => {
  //     try {
  //       const landCode = localStorage.getItem("app_language");
  //       const response = await fetchEntityTranslatedData("countries", landCode);
  //       if (response.success) {
  //         setCountries(Array.isArray(response.result) ? response.result : []);
  //         const defaultCountry = response.result[0];
  //         if (defaultCountry) {
  //           setFormData((prev) => ({
  //             ...prev,
  //             country: defaultCountry.name,
  //           }));
  //         }
  //       }
  //     } catch (error) {
  //       console.error(`Failed to fetch countries`, error);
  //     }
  //   };

  //   const fetchData = async () => {
  //     try {
  //       fetchCollections();
  //     } catch (error) {
  //       console.error(`Failed to fetch countries`, error);
  //     } finally {
  //       setLoadingSidebar(false);
  //     }
  //   };
  //   fetchData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    // No language yet: don't leave the sidebar stuck on the spinner.
    if (!language) {
      setLoadingSidebar(false);
      return;
    }

    let cancelled = false;

    const fetchCountries = async () => {
      setLoadingSidebar(true);
      try {
        let langCode = language;
        try {
          langCode = localStorage.getItem("app_language") || language;
        } catch (_) {
          /* storage blocked (private mode / in-app browsers) */
        }

        const response = await fetchEntityTranslatedData("countries", langCode);
        if (cancelled) return;

        if (response?.success && Array.isArray(response.result)) {
          setCountries(response.result);
          const defaultCountry = response.result[0];
          if (defaultCountry) {
            setFormData((prev) => ({ ...prev, country: defaultCountry.name }));
          }
        } else {
          setCountries([]);
        }
      } catch (error) {
        console.error("Failed to fetch countries", error);
      } finally {
        if (!cancelled) setLoadingSidebar(false);
      }
    };

    fetchCountries();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);
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
          {!isMobile && (
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
          )}
       
          <SubmitButton
            disabled={!isFormValid}
            $valid={isFormValid}
            onClick={handleSubmit}
          >
            {t("make_it_happen")}
          </SubmitButton>
        </Form>
      )}
    </FormWrapper>
  );
}
