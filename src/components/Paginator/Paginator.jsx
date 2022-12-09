import { useState } from "react";
import { Pagination } from "react-bootstrap";

import "./Paginator.css";

const Page = ({ pageNumber, pageIndex, onPageClick }) => {
    return (
        <Pagination.Item active={pageNumber === pageIndex} onClick={onPageClick}>
            {pageNumber}
        </Pagination.Item>
    );
}

export default function Paginator(props) {
    const count = props.count;
    const onPageChange = props.onPageChange;
    const pageSize = props.pageSize || 10;

    const pageCount = Math.ceil(count / pageSize);

    const [pageIndex, setPageIndex] = useState(1);

    const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);

    return (
        <div className="paginator-wrapper">
            <Pagination>
                {pageNumbers.map((pageNumber) => {
                    const lower = Math.max(1, pageIndex - 2);
                    const upper = Math.min(pageCount, pageIndex + 2);
                    if (
                        pageNumber === 1
                        || pageNumber === pageCount
                        || ((upper > pageCount - 2 ? pageCount - 6 : lower) <= pageNumber && pageNumber <= (lower < 3 ? 7 : upper))
                    ) {
                        return <Page
                            key={pageNumber}
                            pageNumber={pageNumber}
                            pageIndex={pageIndex}
                            onPageClick={() => { setPageIndex(pageNumber); onPageChange(pageNumber, pageSize); }}
                        />
                    } else if ((pageNumber === 2 && lower !== 1) || (pageNumber === pageCount - 1 && upper !== pageCount)) {
                        return <Pagination.Ellipsis key={pageNumber} disabled />
                    } else {
                        return "";
                    }
                })}
            </Pagination>
        </div>
    );
}