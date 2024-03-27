async function userRegister(formData: Object) {
    const response = await fetch('http://localhost:5000/api/v1/auth/register', {
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
