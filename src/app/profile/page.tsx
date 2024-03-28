
"use client"

// export default function ManageProfile() {
//     return (
//         <main className="flex justify-center items-center h-screen">
//             <div className="text-center text-lg">
//                 Your Profile

//             </div>
//         </main>
//     )
// }


import { useEffect, useState } from 'react';
import getUserProfile from '../../libs/getUserProfile';
import { UserJSON } from '../../../interface';

export default function ProfilePage({ token }: { token: string }) {
    const [user, setUser] = useState<UserJSON | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userProfile = await getUserProfile(token);
                setUser(userProfile);
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
            }
        };

        fetchUserProfile();
    }, [token]);

    return (
        <main>
            {user ? (
                <div>
                    <h1>Your Profile</h1>
                    <p>Name: {user.data.name}</p>
                    <p>Surname: {user.data.surname}</p>
                    <p>ID: {user.data.id}</p>
                    <p>Campground: {user.data.campground}</p>
                    <p>Book Date: {user.data.bookDate}</p>
                    <p>Role: {user.data.role}</p>
                </div>
            ) : (
                <p>Loading user profile...</p>
            )}
        </main>
    );
}
