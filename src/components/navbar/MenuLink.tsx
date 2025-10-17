import { NavLink } from 'react-router-dom';

const MenuLink = ({ to, children }) => {
	return (
		<NavLink to={to} className={({ isActive }) => (isActive ? ' text-primary font-base' : 'text-foreground font-base md:hover:text-primary ')}>
			{children}
		</NavLink>
	);
};

export default MenuLink;
