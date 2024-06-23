import { EuiProvider } from "@elastic/eui"
import '@elastic/eui/dist/eui_theme_light.css';

import { useThemeStore } from "./stores/useThemeStore";
import { Home } from "./routes/Home";

function App() {
  const theme = useThemeStore(s => s.theme)

  return <>
    <EuiProvider colorMode={theme}>
      <Home />
    </EuiProvider>
  </>
}

export default App;
