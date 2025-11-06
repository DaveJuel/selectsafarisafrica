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

const SetLanguageModal = ({ isOpen, onClose, onLanguageSelect }) => {
    const { t } = useTranslation("common");

    if (!isOpen) return null;

    // Languages grouped by region
    const regions = [
        {
            region: "region_americas",
            languages: [
                { code: "en", label: "English" },
                { code: "es", label: "Español" }
            ]
        },
        {
            region: "region_europe",
            languages: [
                { code: "fr", label: "Français" },
                { code: "pt", label: "Português" }
            ]
        },
        {
            region: "region_middle_east",
            languages: [
                { code: "ar", label: "العربية" }
            ]
        },
        {
            region: "region_asia",
            languages: [
                { code: "zh", label: "中文" }
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
