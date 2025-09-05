import ReactPaginate from 'react-paginate';
import './Pagination.css';

type Props = {
  pageCount: number;
  basedPage: number;
  onChange: (basedPage: number) => void;
  disabled?: boolean;
};

export function Pagination({ pageCount, basedPage, onChange, disabled = false }: Props) {
  const currentPage = Math.min(Math.max(0, basedPage), Math.max(0, pageCount - 1));

  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage}
      onPageChange={({ selected }) => {
        if (!disabled) {
          onChange(selected)
        }
      }}
      previousLabel="<"
      nextLabel=">"
      breakLabel="…"
      containerClassName="pagination"
      pageClassName="pagination__page"
      previousClassName="pagination__nav"
      nextClassName="pagination__nav"
      breakClassName="pagination__break"
      activeClassName="active"
      disabledClassName="disabled"
      ariaLabelBuilder={(pageNum) => `Go to page ${pageNum}`}
      previousAriaLabel="Previous page"
      nextAriaLabel="Next page"
    />
  );
}
