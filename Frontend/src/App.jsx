import { Suspense } from "react";
import { AppProviders } from "./app/providers.jsx";
import { AppRouter } from "./app/router.jsx";
import { PageLoader } from "./components/ui/PageLoader.jsx";

const App = () => {
  return (
    <AppProviders>
      <Suspense fallback={<PageLoader />}>
        <AppRouter />
      </Suspense>
    </AppProviders>
  );
};

export default App;
