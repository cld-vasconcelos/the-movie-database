import { useEffect } from "react";
import { useState } from "react";
import { Pagination } from "react-bootstrap";

import "./Pagination.css";

function Page({ pageNumber, pageIndex, onPageClick }) {
    return (
        <Pagination.Item key={pageNumber} active={pageNumber === pageIndex} onClick={onPageClick}>
            {pageNumber}
        </Pagination.Item>
    );
}

export default function PaginationComponent(props) {
    const count = props.count;
    const onPageChange = props.onPageChange;

    const [pages, setPages] = useState([]);
    const pageSize = props.pageSize || 10;
    const pageCount = Math.ceil(count / pageSize);

    const [pageIndex, setPageIndex] = useState(1);
    useEffect(() => {
        onPageChange(pageIndex, pageSize);

        const updatePages = () => {
            const newPages = [];
    
            const pageLimit = 5;
            const step = 3;
    
            newPages.push(
                <Page pageNumber={1} pageIndex={pageIndex} onPageClick={() => setPageIndex(1)} />
            );
            
            if(pageCount > pageLimit && pageIndex > step) {
                newPages.push(<Pagination.Ellipsis disabled />);
            }
    
            for (let pageNumber = Math.max(2, pageIndex - 2); pageNumber <= Math.min(pageIndex + 2, pageCount - 1); pageNumber++) {
                newPages.push(
                    <Page pageNumber={pageNumber} pageIndex={pageIndex} onPageClick={() => setPageIndex(pageNumber)} />
                );
            }
    debugger;
            if(pageCount > pageLimit && pageIndex <= pageCount - step) {
                newPages.push(<Pagination.Ellipsis disabled />);
            }
    
            newPages.push(
                <Page pageNumber={pageCount} pageIndex={pageIndex} onPageClick={() => setPageIndex(pageCount)} />
            );
    
            setPages(newPages);
        };

        updatePages();
    }, [onPageChange, pageIndex, pageSize, pageCount]);

    return (
        <div className="pagination-wrapper">
            <Pagination>{pages}</Pagination>
        </div>
    );
}