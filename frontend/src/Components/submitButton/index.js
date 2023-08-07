import { Spinner } from "reactstrap"; // You can use any loading spinner component/library you prefer.

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
