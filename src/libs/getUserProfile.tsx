async function getUserProfile(token: string) {
    const response = await fetch('https://campground-backend-tau.vercel.app/api/v1/auth/me', {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${token}`,
        }
    })
    
    if(!response.ok){
        throw new Error('Failed to fetch user profile')
    }
  return await response.json();
}

export default getUserProfile
