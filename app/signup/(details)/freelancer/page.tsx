import { authOptions } from "@/app/lib/auth";
import WelcomeText from "@/app/ui/login-signup-component/freelancer/first-page";
import { getServerSession } from "next-auth";

const page = async () => {
  return <WelcomeText />;
};

export default page;
