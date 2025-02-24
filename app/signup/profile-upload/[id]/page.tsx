import ProfileUploadForm from "@/app/ui/login-signup-component/profile-upload-form/profile-upload";

interface Props {
  params: {
    id: string;
  };
}
const SignUppage = async ({ params }: Props) => {
  return (
    <>
      <ProfileUploadForm />
    </>
  );
};

export default SignUppage;
