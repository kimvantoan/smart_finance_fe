import { useState } from "react";
import { Button } from "../shared/components/ui/button";
import { useTranslation } from "react-i18next";
import i18n from "@/app/i18n";
import { toast } from "sonner";
import { Spinner } from "@/shared/components/ui/spinner";
import { Link } from "@tanstack/react-router";
function App() {
  const [count, setCount] = useState(0);
  const { t } = useTranslation("common");

  return (
    <>
    <Link to="/login">Login</Link> 
    <Spinner />
      <Button
        variant="destructive"
        size="lg"
        onClick={() => setCount((count) => count + 1)}
      >
        Count is {count}
      </Button>
      <button onClick={() => toast.warning('My first toast')}>
        Give me a toast
      </button>
      <h1>{t("common.title")}</h1>
      <button onClick={() => i18n.changeLanguage("vi")}>VI</button>
      <button onClick={() => i18n.changeLanguage("en")}>EN</button>
    </>
  );
}

export default App;
