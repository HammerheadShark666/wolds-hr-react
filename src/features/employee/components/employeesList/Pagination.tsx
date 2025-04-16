import styles from "../../css/Employee-list-pagination.module.css"

type Props = {
  totalPages: number;
  totalEmployees: number
  currentPage: number;
  onPageChange: (page: number) => void;
};
  
const Pagination = ({ totalPages, currentPage, totalEmployees, onPageChange }: Props) => {
  
  return (
    <>
      <div className={totalPages === 0 ? styles["pagination-container-no-employees"] : styles["pagination-container-no-employees-hide"]}>
        <span>No Employees</span>
      </div>
      <div className={totalPages > 0 ? styles["pagination-container"] : styles["pagination-container-hide"]}>
        <div className={styles["left-group"]}>
          <div className={styles["pages-numbers"]}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => onPageChange(i + 1)}>{i + 1}</button>
            ))}
          </div>
          <div className={styles["number-of-pages"]}>
            <span >
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </div>
        <div className={styles["number-of-employees"]}>
          <span>
            Total Employees: {totalEmployees}
          </span>
        </div>
      </div> 
    </>
  );
};
  
export default Pagination;  