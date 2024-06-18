import Booking from "@/db/models/Booking";

async function getBookings() {

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const response = await fetch('https://campground-backend-tau.vercel.app/api/v1/bookings',{next: {tags:['bookings']}});
    if(!response.ok) {
        throw new Error('failed to fetch');
    }
    return await response.json();
}

export default getBookings
