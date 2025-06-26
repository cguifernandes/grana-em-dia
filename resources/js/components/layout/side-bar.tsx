import { ChartPie, CreditCard, File, Folder } from "lucide-react";
import Logo from "../../../assets/logo.svg";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../ui/sidebar";
import { Link } from "@inertiajs/react";

const items = [
    {
        title: "Dashboard",
        url: "/",
        icon: <ChartPie size={18} />,
    },
    {
        title: "Categorias",
        url: "/categories",
        icon: <Folder size={18} />,
    },
    {
        title: "Transações",
        url: "/transactions",
        icon: <CreditCard size={18} />,
    },
    {
        title: "Relatórios",
        url: "/reports",
        icon: <File size={18} />,
    },
];

const SideBar = () => {
    return (
        <Sidebar>
            <SidebarHeader className="py-4">
                <div className="px-3">
                    <div className="flex items-center gap-2">
                        <img src={Logo} alt="Logo" className="h-10 w-auto" />

                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold text-center">
                                Grana Em Dia
                            </h1>
                            <span className="text-muted-foreground text-sm">
                                Controle financeiro
                            </span>
                        </div>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={{
                                                method: "get",
                                                url: item.url,
                                            }}
                                        >
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default SideBar;
