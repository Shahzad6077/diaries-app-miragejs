// export interface ColorPlatte {
//   colorId: number;
//   primary: string;
//   secondary: string;
// }
// export interface ProductItem {
//   id: string;
//   imageUrl: string[];
//   title: string;
//   description: string;
//   colors: ColorPlatte[];
//   price: number;
// }
// export const DEFAULT_PRODUCT_ITEM: ProductItem = {
//   id: "",
//   imageUrl: [],
//   title: "",
//   description: "",
//   colors: [],
//   price: 0,
// };

export interface Diary {
  id: string;
  note: string;
  date: string;
}

export interface DiariesSliceState {
  diaries: Diary[];
}
