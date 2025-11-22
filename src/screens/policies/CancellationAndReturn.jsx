import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../../components/Elements/LoadingSpinner";
import { ContentContainer, Section, SectionTitle, SectionText } from "../../style/policies.styles";

export default function CancellationPolicy() {
    const { t } = useTranslation("cancellation");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Set browser tab title
        document.title = `Select Safaris Africa | ${t("cancellation_title")}`;

        // simulate loading delay
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, [t]);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <ContentContainer>
            <Section>
                <SectionTitle>{t("cancellation_title")}</SectionTitle>
                <SectionText>{t("effective_date")}</SectionText>
                <SectionText>{t("company")}</SectionText>
                <SectionText>{t("brand")}</SectionText>
                <SectionText>{t("welcome_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("general_title")}</SectionTitle>
                <SectionText>{t("general_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("client_cancellation_title")}</SectionTitle>
                <SectionText>{t("client_cancellation_text")}</SectionText>
                <SectionText>{t("standard_terms")}</SectionText>
                <SectionTitle>{t("non_refundable_title")}</SectionTitle>
                <SectionText>{t("non_refundable_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("amendments_title")}</SectionTitle>
                <SectionText>{t("amendments_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("no_show_title")}</SectionTitle>
                <SectionText>{t("no_show_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("company_cancellation_title")}</SectionTitle>
                <SectionText>{t("company_cancellation_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("processing_title")}</SectionTitle>
                <SectionText>{t("processing_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("insurance_title")}</SectionTitle>
                <SectionText>{t("insurance_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("liability_title")}</SectionTitle>
                <SectionText>{t("liability_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("acceptance_title")}</SectionTitle>
                <SectionText>{t("acceptance_text")}</SectionText>
            </Section>
        </ContentContainer>
    );
}
