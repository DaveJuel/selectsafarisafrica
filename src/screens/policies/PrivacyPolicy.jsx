import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../../components/Elements/LoadingSpinner";
import { ContentContainer, Section, SectionTitle, SectionText } from "../../style/policies.styles";

export default function PrivacyPolicy() {
    const { t } = useTranslation("privacy_policy");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Set browser tab title
        document.title = `Select Safaris Africa | ${t("privacy_title")}`;

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
                <SectionTitle>{t("privacy_title")}</SectionTitle>
                <SectionText>{t("effective_date")}</SectionText>
                <SectionText>{t("company")}</SectionText>
                <SectionText>{t("brand")}</SectionText>
                <SectionText>{t("welcome_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("information_title")}</SectionTitle>
                <SectionTitle>{t("personal_info_title")}</SectionTitle>
                <SectionText>{t("personal_info_text")}</SectionText>
                <SectionTitle>{t("non_personal_info_title")}</SectionTitle>
                <SectionText>{t("non_personal_info_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("usage_title")}</SectionTitle>
                <SectionText>{t("usage_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("sharing_title")}</SectionTitle>
                <SectionTitle>{t("third_party_title")}</SectionTitle>
                <SectionText>{t("third_party_text")}</SectionText>
                <SectionTitle>{t("legal_title")}</SectionTitle>
                <SectionText>{t("legal_text")}</SectionText>
                <SectionTitle>{t("business_title")}</SectionTitle>
                <SectionText>{t("business_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("children_title")}</SectionTitle>
                <SectionText>{t("children_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("security_title")}</SectionTitle>
                <SectionText>{t("security_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("international_title")}</SectionTitle>
                <SectionText>{t("international_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("rights_title")}</SectionTitle>
                <SectionText>{t("rights_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("cookies_title")}</SectionTitle>
                <SectionText>{t("cookies_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("changes_title")}</SectionTitle>
                <SectionText>{t("changes_text")}</SectionText>
            </Section>

            <Section>
                <SectionTitle>{t("contact_title")}</SectionTitle>
                <SectionText>{t("contact_text")}</SectionText>
            </Section>
        </ContentContainer>
    );
}
