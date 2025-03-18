import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/app/lib/mongodb';
import Payment from '@/models/payment';

export async function GET(req: NextRequest) {
    await connectMongoDB();
    const { searchParams } = new URL(req.url);
    const allTransaction = searchParams.get('alltransaction');

    try {
        if (allTransaction) {
            const transactions = await Payment.find()
                .select('method status transactionId jobId contractId totalAmount freelancerAmount createdAt clientId freelancerId')
                .populate({ path: 'jobId', select: 'title' })
                .populate({ path: 'freelancerId', select: 'name lastName' })
                .populate({ path: 'clientId', select: 'name lastName' });

            return NextResponse.json({ transactions }, { status: 200 });
        }

        const income = await Payment.find({ status: 'completed' });
        const totalFreelancerAmount = income.reduce((sum, payment) => sum + (payment.freelancerAmount || 0), 0);
        const totalClientAmount = income.reduce((sum, payment) => sum + (payment.totalAmount || 0), 0);

        return NextResponse.json({ totalFreelancerAmount, totalClientAmount }, { status: 200 });
    } catch (error) {
        console.error("Error fetching payments:", error);
        return NextResponse.json({ message: "Server error", error: "" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    return NextResponse.json({ message: `Method ${req.method} Not Allowed` }, { status: 405 });
}
