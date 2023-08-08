import { Spinner } from "reactstrap"; 

const Button = ({ isLoading, children, ...rest }) => {
  return (
    <button type="submit" className="btn btn-primary w-md" disabled={isLoading} {...rest}>
      {isLoading ? (
        <>
          <Spinner size="sm" color="light" className="me-2" /> Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
