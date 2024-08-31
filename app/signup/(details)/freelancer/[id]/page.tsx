import FreelancerForms from "@/app/ui/login-signup-component/freelancer/freelancerForms";

interface Props {
  params: {
    id: string;
  };
}

const page = ({ params }: Props) => {
  return (
    <div className="flex items-center justify-center  h-screen">
      <FreelancerForms />
    </div>
  );
};

export default page;
