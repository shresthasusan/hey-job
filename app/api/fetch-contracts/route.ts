// app/api/contracts/route.js

import { connectMongoDB } from '@/app/lib/mongodb';
import Contract from '@/models/contract';
import Jobs from '@/models/jobs';
import FreelancerInfo from '@/models/freelancerInfo';
import ClientInfo from '@/models/clientinfo';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        await connectMongoDB();

        // Extract query parameters from URL
        const { searchParams } = new URL(req.url);
        const paymentType = searchParams.get("paymentType"); // e.g., "fixed,hourly"
        const status = searchParams.get("status"); // e.g., "active,pending,rejected"
        const clientId = searchParams.get("clientId"); // For client-specific filtering
        const freelancerId = searchParams.get("freelancerId"); // For freelancer-specific filtering

        // Build the query filter based on provided parameters
        let query: { [key: string]: any } = {};
        if (paymentType) {
            const paymentTypes = paymentType.split(',').map(type => type.trim());
            query.paymentType = { $in: paymentTypes };
        }
        if (status) {
            const statuses = status.split(',').map(s => s.trim());
            query.status = { $in: statuses };
        }
        if (clientId) {
            query.clientId = clientId;
        }
        if (freelancerId) {
            query.freelancerId = freelancerId;
        }

        // Determine which data to populate based on the user's role
        const isClient = clientId != null;
        const isFreelancer = freelancerId != null;

        let populateFields: { path: string, model: string }[] = [];
        if (isClient) {
            // Case 1: Client needs job, freelancer, and contract details
            populateFields = [{ path: 'freelancerId', model: 'FreelancerInfo' }];
        } else if (isFreelancer) {
            // Case 2: Freelancer needs job, client, and contract details
            populateFields = [{ path: 'clientId', model: 'ClientInfo' }];
        }

        // Fetch contracts with the necessary fields populated
        const contracts = await Contract.find(query)
            .populate({ path: 'jobId', model: 'Jobs' })
            .populate(populateFields)
            .exec();

        return NextResponse.json({ success: true, data: contracts });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}
