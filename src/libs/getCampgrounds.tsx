import Campground from "@/db/models/Campgrounds";

async function getCampgrounds() {

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const response = await fetch('http://localhost:5000/api/v1/campgrounds',{next: {tags:['campgrounds']}});
    if(!response.ok) {
        throw new Error('failed to fetch');
    }
    return await response.json();
}

export default getCampgrounds
