const config = {
    api: "https://campground-backend-tau.vercel.app/api/v1",
    tokenName: 'token',
    headers: () => {
        return {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
    }
}

export default config
