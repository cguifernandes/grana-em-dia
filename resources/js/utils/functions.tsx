import { CategoryExpense } from "@/components/charts/expenses-by-category-chart";
import { ChartConfig } from "@/components/ui/chart";
import { CategoryIconsType } from "@/types/types";
import {
	ShoppingCart,
	Home,
	Car,
	Utensils,
	Shirt,
	Heart,
	GraduationCap,
	Ticket,
	Gift,
	CreditCard,
	PiggyBank,
	Building,
	Briefcase,
	DollarSign,
	Wifi,
	Phone,
	Trophy,
} from "lucide-react";

export const getInitials = (name: string) => {
	return name
		.split(" ")
		.map((part) => part[0])
		.join("")
		.toUpperCase()
		.substring(0, 2);
};

export const generateChartConfig = (
	data: CategoryExpense[],
	chartColors: string[],
) => {
	const config: ChartConfig = {};

	data.forEach((item, index) => {
		config[item.name] = {
			label: item.name,
			color: chartColors[index % chartColors.length],
		};
	});

	return config;
};

export const categoryIcons: CategoryIconsType[] = [
	{ value: "ShoppingCart", label: "Compras" },
	{ value: "Home", label: "Casa" },
	{ value: "Car", label: "Transporte" },
	{ value: "Utensils", label: "Alimentação" },
	{ value: "Shirt", label: "Vestuário" },
	{ value: "Heart", label: "Saúde" },
	{ value: "GraduationCap", label: "Educação" },
	{ value: "Ticket", label: "Entretenimento" },
	{ value: "Gift", label: "Presentes" },
	{ value: "PiggyBank", label: "Poupança" },
	{ value: "Building", label: "Serviços" },
	{ value: "Briefcase", label: "Trabalho" },
	{ value: "DollarSign", label: "Receita" },
	{ value: "Wifi", label: "Internet" },
	{ value: "Phone", label: "Telefone" },
	{ value: "Trophy", label: "Prêmios" },
] as const;

export const iconMap = {
	ShoppingCart,
	Home,
	Car,
	Utensils,
	Shirt,
	Heart,
	GraduationCap,
	Ticket,
	Gift,
	CreditCard,
	PiggyBank,
	Building,
	Briefcase,
	DollarSign,
	Wifi,
	Phone,
	Trophy,
} as const;

export const renderIcon = (
	iconName: string,
	size = 18,
	color = "currentColor",
) => {
	const IconComponent =
		iconMap[iconName as keyof typeof iconMap] || ShoppingCart;
	return <IconComponent size={size} color={color} />;
};
