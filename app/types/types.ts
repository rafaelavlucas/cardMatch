export type FiltersProps = string;

export interface DataProps {
  filters: FiltersProps[];
  content: Content[];
}

export interface Content {
  image: string;
  name: string;
  genre: string[];
  letter?: string;
  matched?: boolean | null;
}

export interface CategoriesProps {
  title: string;
  img: string;
  link: string;
}

export type LevelsProps = string;
export type CategoryTitle = string;
// export type CategoryTitle = "Animais" | "Frutas e Vegetais";
