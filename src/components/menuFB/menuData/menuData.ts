// import { collection, getDocs, Firestore } from "firebase/firestore/lite";
// import { Imenudata, ImenuGroupByCategory } from './menuDataInterface';

import {
  ImenuGroupByCategory,
  Iadjtypes,
  Iproductdata,
} from "./menuDataInterface";

// async function getMenu(
//   db: Firestore,
//   storeName: string,
//   catName: string
// ): Promise<Imenudata[]> {
//   const menusCol = collection(db, "Menus", storeName, catName);

//   const menusSnapshot = await getDocs(menusCol);

//   const items = menusSnapshot.docs.map((doc) => doc.data()) as Imenudata[];
//   items.forEach((item) => {
//     item.nameShow = item.name === undefined ? "undefined" : item.name;
//     item.priceShow =
//       item.price === undefined ? "undefined" : item.price.toString();
//     item.canAddEggShow =
//       item.canAddEgg === undefined
//         ? "undefined"
//         : item.canAddEgg === true
//         ? "Yes"
//         : "No";
//     item.canAddCheeseShow =
//       item.canAddEgg === undefined
//         ? "undefined"
//         : item.canAddCheese === true
//         ? "Yes"
//         : "No";
//   });
//   //   取得店家之名稱
//   //   console.log(menusCol.parent?.id);
//   //   獲取項目之key
//   // datasTitle.value = Object.keys(items[0]);

//   return items;
// }

// export { getMenu };

export class Menudatas implements ImenuGroupByCategory {
  category_id: number;
  category_name: string;
  adjusttypes: [Iadjtypes];
  products: [Iproductdata];
  constructor() {
    this.category_id = NaN;
    this.category_name = "";
    this.adjusttypes = [
      {
        adjusttype_id: NaN,
        adjusttype_name: "",
        adjusttype_type: "",
        adjustitems: [
          {
            adjustitem_id: NaN,
            adjustitem_name: "",
            adjustitem_priceadjust: NaN,
          },
        ],
      },
    ];
    this.products = [
      {
        product_id: NaN,
        product_name: "",
        product_price: NaN,
      },
    ];
  }
}
