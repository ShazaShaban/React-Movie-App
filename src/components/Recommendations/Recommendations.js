import React, { useState } from "react";
import { useRecommendation } from "../../apis/recommendations";
import Card from "../Card/Card";
import PaginationControlled from "../Pagination/Pagination";
import Loader from "../Loader/Loader";

function Recommendations(props) {
  const { id } = props;
  const [page, setPage] = useState(1);
  const { Recommendation, isLoading } = useRecommendation(id, page);
  const DataRec = Recommendation.results;
  const handleChange = (event, value) => {
    setPage(value);
  };

  if (isLoading) {
    return <Loader />;
  }

  const filteredDataRec = DataRec.filter((item) => item.poster_path);

  if (filteredDataRec.length === 0) {
    return (
      <div className="mt-3 pt-3">
        <hr />
        <p className="fs-2 fw-bold p-3">Recommendations</p>
        <div className="d-flex justify-content-center">
          <p className="fs-3 fw-bold p-3 text-secondary">
            Oop, No recommendations available. Check back soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3 pt-3">
      <hr />
      <p className="fs-2 fw-bold p-3">Recommendations</p>
      <div className="row row-cols-1 row-cols-md-3 row-cols-xl-5 row-cols-xxl-6 ms-4 me-4 justify-content-center">
        {filteredDataRec.map((item) => (
          <div className="col" key={item.id}>
            <Card item={item} />
          </div>
        ))}
      </div>
      <div className="d-flex my-5 justify-content-center">
        <PaginationControlled
          counter={Recommendation.total_pages}
          handleChange={handleChange}
          page={page}
        />
      </div>
    </div>
  );
}

export default Recommendations;
