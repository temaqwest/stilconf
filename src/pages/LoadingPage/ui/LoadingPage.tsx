import AppLoader from "@/shared/ui/AppLoader/AppLoader";
import React from "react";
import cls from './LoadingPage.module.scss'

const LoadingPage = () => {
    return (
        <div className={cls.LoadingPage}>
            <AppLoader/>
        </div>
    );
};

export default LoadingPage;
