import Image from "next/image";
import Link from "next/link";
import SignupForm from "../../../ui/login-signup-component/signup-form";
import { getServerSession } from "next-auth";
// import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../../lib/auth";
import ProfileUploadForm from "@/app/ui/login-signup-component/profile-upload-form/profile-upload";

interface Props {
  params: {
    id: string;
  };
}
const SignUppage = async ({ params }: Props) => {
  return (
    <>
      <ProfileUploadForm
        params={{
          id: params.id,
        }}
      />
    </>
  );
};

export default SignUppage;
