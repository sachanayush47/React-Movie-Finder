import {memo} from "react";
import { useLocation } from "react-router";
import { LinkStyled, NavList } from "./Navs.styled";

const LINKS = [
	{to: "/", text: "Home"},
	{to: "/starred", text: "Starred"}
]

const Navigation = () => {

    const location = useLocation();

    return (
        <nav>
            <NavList>
                { LINKS.map(link => 
                <li key={link.to}>
                    <LinkStyled className={link.to === location.pathname ? "active" : ""} to={link.to}>{link.text}</LinkStyled>
                </li>)}
            </NavList>
        </nav>
    );
}

export default memo(Navigation);