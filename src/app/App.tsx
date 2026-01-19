import { router } from "@/router";
import { useAuth } from "@/shared/utils/auth";
import { RouterProvider } from "@tanstack/react-router";
function App() {
  const authentication = useAuth();
  return <RouterProvider router={router} context={{ authentication }} />;
}

export default App;
