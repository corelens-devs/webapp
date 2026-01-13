
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumb.css';

const Breadcrumb = () => {
  const location = useLocation();
  
  // Create breadcrumb items from current path
  const createBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter(x => x);
    
    // Always start with Home
    const breadcrumbs = [
      { name: 'Home', path: '/' }
    ];
    
    // Build breadcrumb items
    let currentPath = '';
    pathnames.forEach((pathname, index) => {
      currentPath += `/${pathname}`;
      
      // Convert pathname to readable format
      const name = pathname
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({
        name: name,
        path: currentPath,
        isLast: index === pathnames.length - 1
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = createBreadcrumbs();
  
  return (
    <div className="breadcrumb-container">
      <div className="breadcrumb-items">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.path}>
            {crumb.isLast ? (
              <span className="breadcrumb-current">{crumb.name}</span>
            ) : (
              <Link to={crumb.path} className="breadcrumb-link">
                {crumb.name}
              </Link>
            )}
            {index < breadcrumbs.length - 1 && (
              <span className="breadcrumb-separator"> / </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;
