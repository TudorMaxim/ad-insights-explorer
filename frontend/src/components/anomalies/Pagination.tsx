import React from 'react';
import { Button } from 'react-bootstrap';

type PaginationProps = {
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  totalPages: number;
};

const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  totalPages,
}) => (
  <div className="d-flex justify-content-between align-items-center">
    <Button
      variant="outline-secondary"
      disabled={page === '' || page == '1'}
      onClick={() => setPage((prev) => `${parseInt(prev) - 1}`)}
    >
      <i className="fa fa-arrow-left" aria-hidden="true"></i>Previous
    </Button>
    <span>
      Page {page || '1'} of {totalPages}
    </span>
    <Button
      variant="outline-secondary"
      disabled={parseInt(page || '1') === totalPages}
      onClick={() => setPage((prev) => `${parseInt(prev || '1') + 1}`)}
    >
      Next <i className="fa fa-arrow-right" aria-hidden="true"></i>
    </Button>
  </div>
);

export default Pagination;
