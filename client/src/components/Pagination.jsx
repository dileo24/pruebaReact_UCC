import React from "react";

export default function Pagination({
  postsPorPag,
  posts,
  currentPage,
  paginated,
}) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(posts / postsPorPag); i++) {
    pageNumber.push(i);
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        {pageNumber.map((num) => {
          return (
            <button
              className={currentPage !== num ? "numberList" : "current"}
              key={num}
              onClick={() => paginated(num)}
            >
              {num}
            </button>
          );
        })}
      </ul>
    </nav>
  );
}
