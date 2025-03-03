import React, { useState, useEffect } from 'react';

const UpdateProposal = ({ proposalId }: { proposalId: string }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch the current proposal details when the component mounts
        const fetchProposal = async () => {
            try {
                const response = await fetch(`/api/hireproposal/${proposalId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch proposal details');
                }
                const proposal = await response.json();
                setTitle(proposal.title);
                setDescription(proposal.description);
                setBudget(proposal.budget);
            } catch (error) {
                setError('Failed to fetch proposal details');
            }
        };

        fetchProposal();
    }, [proposalId]);

    const handleUpdate = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/hireproposal/${proposalId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    budget,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update proposal');
            }
            const data = await response.json();
            console.log('Proposal updated:', data);
        } catch (error) {
            setError('Failed to update proposal');
        } finally {
            setLoading(false);
        }
    }};

export default UpdateProposal;