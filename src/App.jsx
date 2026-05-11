import Landing from "./pages/Landing.jsx";
import { I18nProvider } from "./i18n/index.jsx";

export default function App() {
  return (
    <I18nProvider>
      <Landing />
    </I18nProvider>
  );
}
