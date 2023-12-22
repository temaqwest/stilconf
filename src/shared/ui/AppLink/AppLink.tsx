import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './AppLink.module.scss'
import React, {FC} from "react";
import {NavLink, NavLinkProps} from "react-router-dom";

interface AppLinkProps extends NavLinkProps{
    className?: string
}

const AppLink: FC<AppLinkProps> = (props) => {
    const {to, className, children, ...args} = props

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                classNames(cls.AppLink, { [cls.linkActive]: isActive})
            }
            {...args}
        >
            { children }
        </NavLink>
    );
};

export default AppLink;
