async function userRegister(formData: Object) {
    const response = await fetch('https://presentation-day-1-duckdaan.vercel.app/api/v1/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })

    if(!response.ok){
        throw new Error('Failed to login')
    }
    return await response.json();
}

export default userRegister
