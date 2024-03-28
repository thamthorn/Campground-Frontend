export interface CampgroundItem {
  _id: string,
  name: string,
  address: string,
  tel: string,
  price: Number,
  rating: Number,
  picture: string,
  v: number,
  id: string
}

export interface CampgroundJson {
  map(arg0: (campground: any) => import("react").JSX.Element): import("react").ReactNode;
  success: boolean,
  count: number,
  pagination: Object,
  data: CampgroundItem[]
}

export interface BookingItem {
  _id: string;
  apptdate: string;
  user:{
    _id: string;
    name: string;
  }
  campground: {
    _id: string;
    name: string;
    address: string;
    tel: string;
    id: string

  }
  createdAt: string;
  v: string
}

export interface UserRole {
_id: string,
role: string
}

export interface BookingListJSON {
success: boolean,
count: number,
data: BookingItem[];
}

export interface UserJSON {
message: string | undefined;
success: boolean;
data: {
  _id: string;
  name: string;
  surname: string;
  id: string;
  campground: string;
  bookDate: string;
  role: string;
}
}