
interface IUserType{
    id : number,
    usertype:string
} ;
const UserTypes = [
    {id : 0, usertype:'Super Admin'},
    {id : 1, usertype:'Vendor'},
    {id : 2, usertype:'Shopper'}
] as const;
const UserTypesValue = UserTypes.map(x => x.usertype)
type EUserType = typeof UserTypesValue[number]

interface IUsers{
    id : number,
    email : string,
    first_name : string,
    last_name : string,
    password? : string,
    user_type : number,
    coins : number,
}

interface IUserAddresses{
    id : number, 
    user_id : number, 
    address_line_1 : string, 
    address_line_2 : string, 
    address_line_3 : string, 
    zipcode : string, 
    city : string, 
    country : string, 
};

interface ICategory{
    id: number,
    category: string,
    subcategory: string,
    subsubcategory: string,
    compulsory_metadata_schema:any
};

interface IBrand{
    id : number,
    name : string,
}

interface IProduct{
    id : number,
    name : string,
    description : string[],
    category_id : number,
    brand_id : number,
    price : number,
    margin : number,
    metadata : any,
    vendor_id:number,
};

interface IProductImages{
    product_id :number,
    location_as_url :string,
};

interface IInventory{
    product_id:number,
    vendor_id:number,
    count:number,
};

interface IOrderStatus{
    id :number,
    order_status : string,
};
const OrderStatuses = [
    {id:0, order_staus: 'In Progress'},
    {id:1, order_staus: 'Delivered'}
] as const;
const OrderStatusValues = OrderStatuses.map(x => x.order_staus);
type EOrderStatus = typeof OrderStatusValues[number]


interface IOrders{
    user_id:number, 
    address_id:number,
    product_id:number,
    count:number, 
    order_status_id:number,
    order_time :Date,
};

interface IDiscount{
    id :number,
    discount_offer:string,
    discount_value : string
};

interface IProductDiscountBridge{
    product_id: number,
    discount_id: number,
};

const digitsAsChar = ['0',
'9',
'8',
'7',
'6',
'5',
'4',
'3',
'2',
'1',
] as const;

interface IReview{
    product_id : number,
    vendor_id : number,
    user_id :number,
    rating : typeof digitsAsChar[number],
    title : string,
    description : string,
};

interface ICart{
    user_id : number,
    product_id : number,
    count : number,
};


interface IProductOnScreen{
    sid : string,
    product_id :number,
    time_in_seconds :number ,
    enter_time :Date,
};

interface IProductWebPageOpen extends IProductOnScreen{};

export type {
    IUserType,
    IUsers,
    IUserAddresses,
    IBrand,
    ICategory,
    IProduct,
    IProductImages,
    IInventory,
    IOrderStatus,
    IOrders,
    IDiscount,
    IProductDiscountBridge,
    IReview,
    ICart,
    IProductWebPageOpen,
    EUserType,
    EOrderStatus
}
