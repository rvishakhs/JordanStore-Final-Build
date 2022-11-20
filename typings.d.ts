interface Sanitybody {
    _createdAt: string;
    _id: string;
    _rev: string;
    _updatedAt: string;
    otherProp?: any;
    url : string
}


interface  image {
    _type : "image";
    asset :{
        _ref: string,
        _type: "reference"
    };
    url : string
}

export interface categories extends Sanitybody {
    _type : "categories";
    title : string
    slug : {
        _type : "slug"
        current: string
    }
    _ref : string;
}

export interface products extends Sanitybody {
    _type : "products";
    brand   : string;
    colour : string;
    image : image
    price : number;
    title : string;
    category : categories
    year : number;
    description : string
    slug: {
        _type: "slug";
        current: string;
      };
      category: {
        _type: "reference";
        _ref: string;
      };
}

export interface stripeProducts {
    id: string;
    amount_discount: number;
    amount_subtotal: number;
    amount_tax: number;
    amount_total: number;
    currency: string;
    description: string;
    object: string;
    quantity: number;
    price: {
        unit_amount: number;
    };
}