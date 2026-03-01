import { ImageSource } from "expo-image";

export type Product = {
	name: string;
	quantity_available: number;
	price: number;
	image: ImageSource;
};
