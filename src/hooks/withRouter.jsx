// ============================================
// IMPORTS
// ============================================

import { useLocation, useNavigate, useParams } from 'react-router-dom';
// React Router hooks:
// - useLocation: Gets current URL information (pathname, search params, state)
// - useNavigate: Provides function to programmatically navigate between pages
// - useParams: Gets dynamic URL parameters (e.g., /user/:id → { id: '123' })

// ============================================
// HIGHER-ORDER COMPONENT (HOC)
// ============================================

/**
 * withRouter - Higher-Order Component
 * 
 * This HOC wraps a component and injects routing props (location, navigate, params)
 * into it, allowing any component to access routing functionality even if it's
 * not directly rendered by a <Route> component.
 * 
 * WHAT IS A HIGHER-ORDER COMPONENT?
 * A function that takes a component and returns an enhanced version of that component.
 * It's a pattern for reusing component logic.
 * 
 * WHY DO WE NEED THIS?
 * 
 * Problem:
 * - Only components rendered directly by <Route> receive routing props automatically
 * - Deeply nested components or class components can't access routing information
 * - Class components can't use React Router hooks (hooks only work in function components)
 * 
 * Solution:
 * - withRouter wraps any component and gives it routing capabilities
 * - Works with both class and function components
 * - Provides location, navigate, and params as props
 * 
 * USE CASES:
 * 1. Class components that need routing (can't use hooks directly)
 * 2. Deeply nested components to avoid prop drilling
 * 3. Third-party components that need routing access
 * 4. Components that need to know current URL for conditional rendering
 * 
 * @param {React.Component} Component - The component to wrap with routing props
 * @returns {React.Component} - Enhanced component with routing props injected
 * 
 * @example
 * // Class component (can't use hooks)
 * class Header extends Component {
 *   render() {
 *     // Access routing props via this.props
 *     const { location, navigate } = this.props;
 *     return <div>Current path: {location.pathname}</div>;
 *   }
 * }
 * export default withRouter(Header);
 * 
 * @example
 * // Function component (alternative to using hooks directly)
 * function MyComponent({ location, navigate, params }) {
 *   return (
 *     <div>
 *       <p>Current URL: {location.pathname}</p>
 *       <button onClick={() => navigate('/home')}>Go Home</button>
 *     </div>
 *   );
 * }
 * export default withRouter(MyComponent);
 */
function withRouter(Component) {
  /**
   * ComponentWithRouterProp
   * The enhanced component that wraps the original component
   * It uses React Router hooks and passes their values as props
   * 
   * @param {Object} props - Any props passed to the enhanced component
   * @returns {JSX.Element} - The original component with routing props injected
   */
  function ComponentWithRouterProp(props) {
    // ==========================================
    // REACT ROUTER HOOKS
    // ==========================================
    
    /**
     * useLocation hook
     * Returns the current location object containing:
     * - pathname: Current URL path (e.g., '/about')
     * - search: Query string (e.g., '?id=123')
     * - hash: URL hash (e.g., '#section')
     * - state: Location state data
     */
    let location = useLocation();
    
    /**
     * useNavigate hook
     * Returns a function to programmatically navigate:
     * - navigate('/about') → Go to about page
     * - navigate(-1) → Go back one page
     * - navigate(1) → Go forward one page
     * - navigate('/user/123', { replace: true }) → Replace current history entry
     */
    let navigate = useNavigate();
    
    /**
     * useParams hook
     * Returns an object of dynamic URL parameters:
     * - If route is '/user/:id', visiting '/user/123' gives { id: '123' }
     * - If route is '/product/:category/:id', visiting '/product/electronics/456' gives 
     *   { category: 'electronics', id: '456' }
     */
    let params = useParams();
    
    // ==========================================
    // RENDER ENHANCED COMPONENT
    // ==========================================
    
    /**
     * Render the original component with:
     * 1. All its original props (spread with {...props})
     * 2. Added routing props (location, navigate, params)
     * 
     * This way, the wrapped component receives everything it needs
     * without losing any existing functionality
     */
    return (
      <Component
        {...props}           // Pass through all original props
        location={location}  // Inject current location object
        params={params}      // Inject URL parameters
        navigate={navigate}  // Inject navigation function
      />
    );
  }

  // Return the enhanced component
  return ComponentWithRouterProp;
}

// ============================================
// EXPORT
// ============================================

export default withRouter;