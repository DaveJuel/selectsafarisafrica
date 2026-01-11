import { useOutletContext } from "react-router-dom";
import LoadingSpinner from "../Elements/LoadingSpinner";
import { ViewSection } from "../../style/main.view.styles";
import AdventuresView from "./AdventuresView";

export default function MainView() {
  const {
    loadingMainView,
    formData,
    language
  } = useOutletContext();
  return (
    <ViewSection>
      {loadingMainView && <LoadingSpinner />}

      {!loadingMainView && (
        <AdventuresView formData={formData} language={language} />
      )}
    </ViewSection>
  );
}
