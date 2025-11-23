import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../../components/Elements/LoadingSpinner";
import { ContentContainer, Section, SectionTitle, SectionText, FileTitle } from "../../style/policies.styles";
import PolicyHeader from "../../components/Elements/PolicyHeader";

export default function TermsAndConditions() {
    const { t } = useTranslation("terms");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Set browser tab title
        document.title = `Select Safaris Africa | ${t("terms_title")}`;

        // simulate loading delay
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, [t]);

    useEffect(() => {
        // simulate loading delay
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <ContentContainer >
            <PolicyHeader />
            <FileTitle>
                {t("terms_title")}
            </FileTitle>
            <Section>
                <SectionText>{t("welcome_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("definitions_title")}</SectionTitle>
                <SectionText>{t("definitions_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("scope_title")}</SectionTitle>
                <SectionText>{t("scope_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("eligibility_title")}</SectionTitle>
                <SectionText>{t("eligibility_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("booking_title")}</SectionTitle>
                <SectionText>{t("booking_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("travel_documents_title")}</SectionTitle>
                <SectionText>{t("travel_documents_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("safety_title")}</SectionTitle>
                <SectionText>{t("safety_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("health_title")}</SectionTitle>
                <SectionText>{t("health_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("liability_title")}</SectionTitle>
                <SectionText>{t("liability_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("insurance_title")}</SectionTitle>
                <SectionText>{t("insurance_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("third_party_title")}</SectionTitle>
                <SectionText>{t("third_party_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("ip_title")}</SectionTitle>
                <SectionText>{t("ip_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("privacy_title")}</SectionTitle>
                <SectionText>{t("privacy_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("modifications_title")}</SectionTitle>
                <SectionText>{t("modifications_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("law_title")}</SectionTitle>
                <SectionText>{t("law_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("acceptance_title")}</SectionTitle>
                <SectionText>{t("acceptance_text")}</SectionText>
                <SectionText>{t("effective_date")}</SectionText>
            </Section>
        </ContentContainer>
    );
}
