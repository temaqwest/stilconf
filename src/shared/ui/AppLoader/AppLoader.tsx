import React from 'react';
import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './AppLoader.module.scss'

interface AppLoaderProps {
    className?: string
}

const AppLoader = ({className}: AppLoaderProps) => {
    return (
        <div className={classNames(cls?.AppLoader, {}, [className])}>
            <div className={cls.AppLoaderDot}></div>
            <div className={cls.AppLoaderDot}></div>
            <div className={cls.AppLoaderDot}></div>
        </div>
    );
};

export default AppLoader;
