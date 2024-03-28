export interface CampgroundItem {
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
    __v: string
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
<<<<<<< HEAD
    surname: string;
    id: string;
    campground: string;
    bookDate: string;
  }

  enum Role {
    User = 'user',
    Admin = 'admin'
  }

  interface RegisterJson {
    name: string,
    tel: string,
    email: string,
    role: string,
    password: string
  }
||||||| 1ce5170
    surname: string;
    id: string;
    campground: string;
    bookDate: string;
  }
=======
    email: string;
    tel: string;
    role: string;
    createdAt: string;
    __v:number
  };
}

export interface DeleteJSON {
  success: boolean;
  data: Object
}

>>>>>>> 4a913e1756eeee6b8b50825e16e6f51fb2c9228b
