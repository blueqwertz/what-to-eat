import { toast } from "react-hot-toast";

export function handleTRPCerror(e: any) {
  const errorMessage = e.data?.zodError?.fieldErrors?.content;
  if (errorMessage && errorMessage[0]) {
    toast.error(errorMessage[0]);
  } else if (typeof e.message == "string") {
    toast.error(e.message);
  } else {
    toast.error("Ein Fehler ist aufgetreten! Bitte versuche es später erneut.");
  }
}
