async function getCampgrounds() {

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const response = await fetch('https://presentation-day-1-duckdaan.vercel.app/api/v1/campgrounds');
    if(!response.ok) {
        throw new Error('failed to fetch');
    }
    return await response.json();
}

export default getCampgrounds
