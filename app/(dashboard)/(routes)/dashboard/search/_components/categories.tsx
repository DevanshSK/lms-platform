"use client";

import { ICategoryResponse } from "@/redux/types";
import CategoriesItem from "./categories-item";

interface CategoriesProps{
    items: ICategoryResponse[];
}


const Categories = ({
    items
}: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
        {items.map( (item) => (
            <CategoriesItem 
                key={item.id}
                label={item.cate_name}
                value={item.id}
            />
        ))}
    </div>
  )
}

export default Categories