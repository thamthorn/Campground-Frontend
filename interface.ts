interface CampgroundItem {
  _id: string,
  name: string,
  address: string,
  tel: string,
  price: Number,
  rating: Number,
  picture: string
}

interface CampgroundJson {
  map(arg0: (campground: any) => import("react").JSX.Element): import("react").ReactNode;
  success: boolean,
  count: number,
  pagination: Object,
  data: CampgroundItem[]
}

interface BookingItem {
  _id: string;
  apptDate: string;
  user:{
    _id: string;
    name: string;
  }
  campground: {
    _id: string;
    name: string;
    address: string;
    tel: string;
    price: number;
    rating: number;
  }
}

interface UserRole {
_id: string,
role: string
}

interface BookingListJSON {
success: boolean,
count: number,
data: BookingItem[];
}

interface UserJSON {
message: string | undefined;
success: boolean;
data: {
  _id: string;
  name: string;
  surname: string;
  email: string;
  tel: string;
  campground: string;
  bookDate: string;
  role: string;
}
}

interface DeleteJSON {
  success: boolean;
  data: Object
}