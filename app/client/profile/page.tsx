import React from 'react';

interface ProfileProps {
    name: string;
    email: string;
    bio: string;
}

const Profile: React.FC<ProfileProps> = ({ name, email, bio }) => {
    return (
        <div style={styles.container}>
            <h1>Profile Page</h1>
            <div style={styles.profileContainer}>
                <h2>{name}</h2>
                <p>Email: {email}</p>
                <p>Bio: {bio}</p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
    },
    profileContainer: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    },
};

export default Profile;