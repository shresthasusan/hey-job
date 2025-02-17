'use client';

import AllJobsPage from '@/app/ui/client-components/all-jobs/page';
import { useSession } from 'next-auth/react';
import { Button } from '../../ui/button';

const YourJobsPage = ({ params }: { params: { id: string } }) => {
    const { data: session } = useSession();
    const userId = session?.user?.id;

    return (
        <>
            <div className='mx-auto text-center'>
                <h1 className='font-bold text-5xl p-6'>
                    Jobs, <span className='text-yellow-400'>{session?.user?.name} {session?.user?.lastName}</span> has posted.
                </h1>
                {userId ? <AllJobsPage userId={userId} /> : <p>Loading...</p>}
            </div>
            <div className='flex justify-center mt-4'>
                <Button className='px-20 py-8 text-xl'  onClick={() => window.location.href = '/client/post-job'}>Post a Job Now</Button>
            </div>
        </>
    );
};

export default YourJobsPage;