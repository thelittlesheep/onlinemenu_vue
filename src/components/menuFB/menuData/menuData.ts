import { collection, getDocs, Firestore } from "firebase/firestore/lite";
import { Imenudata } from "./menuDataInterface";

async function getMenu(
  db: Firestore,
  storeName: string,
  catName: string
): Promise<Imenudata[]> {
  const menusCol = collection(db, "Menus", storeName, catName);

  const menusSnapshot = await getDocs(menusCol);

  const items = menusSnapshot.docs.map((doc) => doc.data()) as Imenudata[];
  items.forEach((item) => {
    item.nameShow = item.name === undefined ? "undefined" : item.name;
    item.priceShow =
      item.price === undefined ? "undefined" : item.price.toString();
    item.canAddEggShow =
      item.canAddEgg === undefined
        ? "undefined"
        : item.canAddEgg === true
        ? "Yes"
        : "No";
    item.canAddCheeseShow =
      item.canAddEgg === undefined
        ? "undefined"
        : item.canAddCheese === true
        ? "Yes"
        : "No";
  });
  //   取得店家之名稱
  //   console.log(menusCol.parent?.id);
  //   獲取項目之key
  // datasTitle.value = Object.keys(items[0]);

  return items;
}

export { getMenu };
