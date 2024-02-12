"use client";

import qs from "query-string";
import { cn } from "@/lib/utils";
import {
    usePathname,
    useRouter,
    useSearchParams
} from "next/navigation"

interface CategoryItemProps {
    label: string;
    value?: number;
}

const CategoriesItem = ({
    label, value
}: CategoryItemProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCategoryId = searchParams.get('categoryId');
    const currentTitle = searchParams.get('title');

    const isSelected = Number(currentCategoryId) === value;

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: currentTitle,
                categoryId: isSelected ? null : value,
            }
        }, { skipNull: true, skipEmptyString: true });

        router.push(url);
    }

    return (
        <button
            className={cn(
                "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-blue-700 transition whitespace-nowrap",
                isSelected && "border-blue-700 bg-blue-200/20 text-blue-800"
            )}
            onClick={onClick}
            type="button"
        >
            {label}
        </button>
    )
}

export default CategoriesItem