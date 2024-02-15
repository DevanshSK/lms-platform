"use client";

import { ICategoryResponse } from "@/redux/types";
import CategoriesItem from "./categories-item";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CategoriesProps {
    items: ICategoryResponse[];
}


const Categories = ({
    items
}: CategoriesProps) => {
    return (
        <ScrollArea>
            <div className="flex mb-2 items-center gap-x-2 overflow-x-auto pb-2">
                {items.map((item) => (
                    <CategoriesItem
                        key={item.id}
                        label={item.cate_name}
                        value={item.id}
                    />
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}

export default Categories