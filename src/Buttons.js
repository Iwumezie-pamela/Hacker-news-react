import React from "react";
import { useGlobalContext } from "./context";

const Buttons = () => {
  const { nbPages, handlePage, page, loading } = useGlobalContext();

  return (
    <div className="btn-container">
      <button
        type="submit"
        disabled={loading}
        onClick={() => handlePage("decrease")}
      >
        prev
      </button>
      <p>
        {page + 1} of {nbPages}
      </p>
      <button
        type="submit"
        disabled={loading}
        onClick={() => handlePage("increase")}
      >
        next
      </button>
    </div>
  );
};

export default Buttons;
