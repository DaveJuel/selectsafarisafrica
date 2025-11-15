import { useTranslation } from "react-i18next";
import {
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalTitle,
    CloseButton,
    ModalBody
} from "../../style/confirm.booking.modal.styles";

import {
    LanguagesContainer,
    RegionLabel,
    LanguageButton,
    RegionsGrid,
    LanguagesList
} from "../../style/set.language.modal.styles";

const SetLanguageModal = ({ isOpen, onClose, onLanguageSelect, language }) => {
    const { t } = useTranslation("common");

    if (!isOpen) return null;

    // Languages grouped by region
    const regions = [
        {
            region: "region_americas",
            languages: [
                { code: "en", label: "English" },
                { code: "es", label: "Español" },
                { code: "pt-br", label: "Português (Brasil)" }
            ]
        },
        {
            region: "region_europe",
            languages: [
                { code: "fr", label: "Français" },
                { code: "pt-pt", label: "Português" },
                { code: "ru", label: "Русский" },
                { code: "de", label: "Deutsch" }
            ]
        },
        {
            region: "region_middle_east",
            languages: [
                { code: "ar", label: "العربية" },
                { code: "tr", label: "Türkçe" }
            ]
        },
        {
            region: "region_asia",
            languages: [
                { code: "zh", label: "中文" },
                { code: "ja", label: "標準語" },
                { code: "ko", label: "표준어" }
            ]
        }
    ];

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <ModalTitle>{t("select_language")}</ModalTitle>
                    <CloseButton onClick={onClose}>×</CloseButton>
                </ModalHeader>

                <ModalBody>
                    <RegionsGrid >
                        {regions.map((group, index) => (
                            <LanguagesContainer key={index}>
                                <RegionLabel>{t(group.region)}</RegionLabel>

                                <LanguagesList>
                                    {group.languages.map((lang) => (
                                        <LanguageButton
                                            key={lang.code}
                                            active={language === lang.code}
                                            onClick={() => onLanguageSelect(lang.code)}
                                        >
                                            {lang.label}
                                        </LanguageButton>
                                    ))}
                                </LanguagesList>
                            </LanguagesContainer>
                        ))}
                    </RegionsGrid>

                </ModalBody>
            </ModalContent>
        </ModalOverlay>
    );
};

export default SetLanguageModal;
