import { Alert, AlertTitle } from "@/components/ui/alert";
import { useEffect } from "react";

interface NewsAlertsProps {
  message: string;
  showAlert: boolean;
  setShowAlert: (showAlert: boolean) => void;
}

export const NewsAlerts = ({
  message,
  showAlert,
  setShowAlert,
}: NewsAlertsProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  return (
    <Alert
      className={`max-w-sm duration-300 transition-all ease-in-out ${
        showAlert ? "opacity-100" : "opacity-0"
      } ${
        message.includes("Error")
          ? "bg-red-500 text-white border-red-600"
          : "bg-green-500 text-white border-green-600"
      }`}
    >
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  );
};
