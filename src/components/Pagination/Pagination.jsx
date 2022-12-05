import { useEffect } from "react";
import { useState } from "react";
import { Pagination } from "react-bootstrap";

export default function PaginationComponent(props) {
    const count = props.count;
    const onPageChange = props.onPageChange;
    
    const pageSize = props.pageSize || 10;
    const pageCount = Math.ceil(count / pageSize);

    const [pageIndex, setPageIndex] = useState(1);
    useEffect(() => {
        onPageChange(pageIndex, pageSize);
    }, [onPageChange, pageIndex, pageSize]);

    let pages = [];
    for (let number = 1; number <= pageCount; number++) {
        pages.push(
            <Pagination.Item key={number} active={number === pageIndex} onClick={() => setPageIndex(number)}>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <Pagination>{pages}</Pagination>
    );
}