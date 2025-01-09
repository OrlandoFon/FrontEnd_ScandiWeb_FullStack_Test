/**
 * withRouter - Higher Order Component for React Router v6 integration
 * Provides navigation, location and params to class components
 * Wraps components with router functionality from hooks
 */
import { useNavigate, useLocation, useParams } from "react-router-dom";

/**
 * Wraps a component with router props
 * @param {React.Component} Component - Component to be wrapped
 * @returns {React.Component} Component with router props
 */
export const withRouter = (Component) => {
  /**
   * WithRouter - Wrapper component that injects router props
   * @param {Object} props - Component props
   * @returns {JSX.Element} Wrapped component with router props
   */
  const WithRouter = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    return (
      <Component
        {...props}
        navigate={navigate}
        location={location}
        params={params}
      />
    );
  };

  WithRouter.displayName = `WithRouter(${
    Component.displayName || Component.name || "Component"
  })`;

  return WithRouter;
};
