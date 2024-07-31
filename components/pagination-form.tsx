"use client";
import React, { useCallback, useEffect, useState } from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';

const PaginationForm = ({ isValid }: { isValid: boolean }) => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const recentPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    const [currentPage, setCurrentPage] = useState<number>(recentPage);

    const handlePageChange = useCallback((value: number) => {
        setCurrentPage(value);
    }, []);


    useEffect(() => {
        const currentParams = Object.fromEntries(searchParams.entries());
        // console.log("current params", currentParams, currentPage);
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                ...currentParams,
                page: currentPage,
            }
        }, { skipNull: true, skipEmptyString: true });

        router.push(url);
    }, [currentPage, pathname, router, searchParams]);

    const renderPaginationItems = () => {
        let items: JSX.Element[] = [];

        if (currentPage > 1) {
            items.push(
                <PaginationItem key="prev">
                    <PaginationPrevious href="" onClick={() => handlePageChange(currentPage - 1)} />
                </PaginationItem>
            );
        }

        if (currentPage > 3) {
            items.push(
                <PaginationItem key="1">
                    <PaginationLink href="" onClick={() => handlePageChange(1)}>1</PaginationLink>
                </PaginationItem>
            );
            items.push(<PaginationEllipsis key="ellipsis-start" />);
        }

        for (let i = Math.max(1, currentPage - 1); i <= currentPage; i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink href="" isActive={i === currentPage} onClick={() => handlePageChange(i)}>
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        if (isValid) {

            items.push(
                <PaginationItem key={currentPage + 1}>
                    <PaginationLink href="" onClick={() => handlePageChange(currentPage + 1)}>
                        {currentPage + 1}
                    </PaginationLink>
                </PaginationItem>
            );
            items.push(<PaginationEllipsis key="ellipsis-end" />);
            items.push(
                <PaginationItem key="next">
                    <PaginationNext href="" onClick={() => handlePageChange(currentPage + 1)} />
                </PaginationItem>
            );
        }

        return items;
    };

    console.log(currentPage);

    return (
        <div className='py-4'>
            <Pagination>
                <PaginationContent>
                    {renderPaginationItems()}
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default PaginationForm