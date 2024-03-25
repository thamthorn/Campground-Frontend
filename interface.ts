export interface HospitalItem {
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    tel: string,
    picture: string,
    __v: number,
    id: string
  }
  
export interface HospitalJson {
    map(arg0: (hospital: any) => import("react").JSX.Element): import("react").ReactNode;
    success: boolean,
    count: number,
    pagination: Object,
    data: HospitalItem[]
  }

export interface BookingItem {
    name: string;
    surname: string;
    id: string;
    hospital: string;
    bookDate: string;
  }