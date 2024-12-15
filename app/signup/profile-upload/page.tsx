import Image from "next/image";
import Link from "next/link";
import SignupForm from "../../ui/login-signup-component/signup-form";
import { getServerSession } from "next-auth";
// import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../lib/auth";
import ProfileUploadForm from "@/app/ui/login-signup-component/profile-upload-form/profile-upload";

const SignUppage = async () => {
  const session = await getServerSession(authOptions); //typescript error
  if (session) redirect("/");

  return (
    <>
      <ProfileUploadForm />
    </>
  );
};

export default SignUppage;
