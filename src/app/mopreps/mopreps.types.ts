export declare namespace MOPPREPS {
  export interface MEALPODS {
    MEALPREPS: Array<MEALPREP>;
  }

  export interface MEALPREP {
    ID: number;
    NAME: string;
    MEALPODIMG: string;
    MEALPODPRICE: number;
    MEALPODHOVERIMG: string;
  }
}
