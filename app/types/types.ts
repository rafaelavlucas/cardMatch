export interface DataProps {
  filters: FiltersProps[];
  content: Content[];
}
export interface MainButtonProps {
  text: string;
  link: string;
}
export interface Content {
  image: string;
  name: string;
  genre: string[];
  letter?: string;
  matched?: boolean;
}

export type FiltersProps = string;
export type LevelsProps = string;
export type CategoryTitle = any;
// export type CategoryTitle = "Animais" | "Frutas e Vegetais";
