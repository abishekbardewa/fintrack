import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, selectUser } from '../../redux/slices/authSlice';
import { FaAngleDown, FaArrowRightFromBracket } from 'react-icons/fa6';
import MenuLink from './MenuLink';

export default function UserMenu() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const buttonRef = useRef(null);

	const handleLogout = async () => {
		try {
			dispatch(clearUser());
			navigate('/');
		} catch (err) {
			// Silent fail - logout should always succeed locally
		}
	};

	const getInitials = (name: string) => {
		const firstInitial = name.charAt(0).toUpperCase();
		return `${firstInitial}`;
	};

	useEffect(() => {
		// const closeMenu = () => {
		// 	setIsMenuOpen(false);
		// };

		const closeMenu = (event) => {
			// Prevent clicks inside the menu from closing it
			if (buttonRef.current && !buttonRef.current.contains(event.target)) {
				setIsMenuOpen(false);
			}
		};

		if (isMenuOpen) {
			document.body.addEventListener('click', closeMenu);
		}

		return () => {
			document.body.removeEventListener('click', closeMenu);
		};
	}, [isMenuOpen]);

	const toggleMenu = (event) => {
		event.stopPropagation();
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<div className="flex items-center gap-16">
			<div className="hidden md:flex items-center gap-8">
				<MenuLink to="/overview">Overview</MenuLink>
				<MenuLink to="/history">History</MenuLink>
				<MenuLink to="/trend">Trend</MenuLink>
			</div>
			<div ref={buttonRef} className="relative">
				<div
					role="button"
					onClick={toggleMenu}
					className="relative rounded-full text-sm focus:outline-none  hover:opacity-70 flex items-center space-x-1.5 transition-opacity"
				>
					<div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card font-semibold uppercase text-foreground">
						{getInitials(user.name)}
					</div>
					<FaAngleDown className={`transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : 'rotate-0'}`} />
				</div>

				<div
					className={`absolute right-0 top-full z-20 w-48 origin-top-right overflow-hidden rounded-lg bg-background shadow-lg transition-all duration-300 transform ${
						isMenuOpen ? 'block opacity-100 translate-y-0' : 'hidden opacity-0 -translate-y-2'
					}`}
				>
					{/* Dropdown Content */}
					<div className="space-y-3 bg-card p-4">
						<p className="text-lg font-semibold break-words text-foreground">{user?.name}</p>
					</div>
					<ul>
						<MenuLink to="/overview">
							<li className="md:hidden flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-muted">Overview</li>
						</MenuLink>
						<MenuLink to="/history">
							<li className="md:hidden flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-muted">History</li>
						</MenuLink>
						<MenuLink to="/trend">
							<li className="md:hidden flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-muted">Trend</li>
						</MenuLink>
						<li className="flex cursor-pointer items-center gap-3 p-4 hover:bg-muted" onClick={handleLogout}>
							<FaArrowRightFromBracket className="text-base-secondary-text" />
							Logout
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
