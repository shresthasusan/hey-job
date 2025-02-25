
import AllProposalsList from "@/app/ui/client-components/proposallist/proposallist";

const AllJobsListProps = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <>
      <div className="mx-auto text-center">
        <h1 className="font-bold text-5xl p-6">Job Proposals</h1>
        {id ? <AllProposalsList jobId={id} /> : <p>Loading...</p>}
      </div>
    </>
  );
};

export default AllJobsListProps;