import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";
import Campgrounds from "@/db/models/Campgrounds"
import { dbConnect } from "@/db/dbConnect";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";


export default async function DashboardPage () {
    const addCampground = async(addCampgroundForm:FormData) => {
        "use server"
        const Campname = addCampgroundForm.get("Campname")
        const address = addCampgroundForm.get("address")
        const tel = addCampgroundForm.get("tel")
        const price = addCampgroundForm.get("price")
        const rating = addCampgroundForm.get("rating")
        const picture = addCampgroundForm.get("picture")

        try{
            await dbConnect()
            const Campground = await Campgrounds.create({
                "name":Campname,
                "address":address,
                "tel":tel,
                "price":price,
                "rating":rating,
                "picture":picture
            })
        } catch(error) {
            console.log(error)
        }
        revalidateTag("campgrounds")
        redirect("/campground")
    }
    const session = await getServerSession(authOptions);
        if(!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)
    var createAt = new Date(profile.data.createdAt);
    return (

        <main className="bg-slate-100">
            <div>Your Dashboard</div>
            <div className='bg-slate-100 rounded-lg'>
            <div className='text-2xl text-center'>{profile.data.name}</div>
            <table className='table-auto border-separate border-spacing-2'>
                <tbody>
                <tr><td>Email</td><td>{profile.data.email}</td></tr>
                <tr><td>Tel.</td><td>{profile.data.tel}</td></tr>
                <tr><td>Member Since</td><td>{createAt.toString()}</td></tr>
                </tbody>
            </table>
            
            </div>
            {
                (profile.data.role == "admin")?
                <form action={addCampground}>
                    <div className="text-xl text-blue-700">Create New Campground</div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="name">Name</label>
                        <input type="text" required id="Campname" name="Campname" placeholder="CampGround Name" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                    </div>

                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="name">Address</label>
                        <input type="text" required id="address" name="address" placeholder="CampGround Address" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                    </div>

                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="name">Telephone Number</label>
                        <input type="text" required id="tel" name="tel" placeholder="CampGround Tel." className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                    </div>

                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="name">Price</label>
                        <input type="number" required id="price" name="price" placeholder="CampGround Price" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                    </div>

                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="name">Price</label>
                        <input type="number" required id="rating" name="rating" placeholder="CampGround rating(0-5)" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                    </div>

                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="name">Price</label>
                        <input type="text" required id="picture" name="picture" placeholder="CampGround Picture Link" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                    </div>
                </form>
                :null
            }
        </main>
    );
}