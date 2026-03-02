import { cookies } from "next/headers";
import Steps from "./_components/ConfirmSteps/ConfirmSteps";
export default async function Page() {
  const cookieStore = await cookies();
  function checkCookie() {
    if (cookieStore.get("email")?.value) {
      return cookieStore.get("email")!.value;
    } else return false;
  }
  return (
    <>
      <Steps showSecondStep={checkCookie()}></Steps>
    </>
  );
}
