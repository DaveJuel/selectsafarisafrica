import { useState, useEffect } from "react";

function useItemsPerPage() {
  const [itemsPerPage, setItemsPerPage] = useState(6); // default for large screens

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth <= 768) {
        setItemsPerPage(3); // show 3 on smaller screens
      } else {
        setItemsPerPage(6); // show 6 on larger screens
      }
    };

    updateItemsPerPage(); // set initial value
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  return itemsPerPage;
}

export default useItemsPerPage;
