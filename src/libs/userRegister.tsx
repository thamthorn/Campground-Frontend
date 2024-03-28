async function userRegister(userRegisterData: RegisterJson, role: Role) {
    const response = await fetch('http://localhost:5000/api/v1/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: userRegisterData.name, 
            tel: userRegisterData.tel,
            email: userRegisterData.email,
            password: userRegisterData.password,
            role: role.toString()
        }),
    })

    if(!response.ok){
        throw new Error('Failed to login')
    }
    return await response.json();
}

export default userRegister
