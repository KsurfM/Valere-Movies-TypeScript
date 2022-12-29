import "bootstrap/dist/css/bootstrap.min.css";

const PageNotFound: React.FC = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <h1 className="d-flex ">404</h1>
          <h2>Sorry, we could not find the page you were looking for.</h2>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
