interface CampgroundItem {
    _id: string,
    name: string,
    address: string,
    tel: string,
    price: Number,
    rating: Number,
    picture: string,
    __v: number,
    id: string
  }
  
interface CampgroundJson {
    map(arg0: (campground: any) => import("react").JSX.Element): import("react").ReactNode;
    success: boolean,
    count: number,
    pagination: Object,
    data: CampgroundItem[]
  }

interface BookingItem {
    name: string;
    surname: string;
    id: string;
    campground: string;
    bookDate: string;
  }