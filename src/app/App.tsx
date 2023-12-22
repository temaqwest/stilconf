import './styles/main.scss'
import {classNames} from "@/shared/lib/classNames/classNames";
import {BrowserRouter} from "react-router-dom";
import AppLink from "@/shared/ui/AppLink/AppLink";
import {RoutePaths} from "@/shared/config/routeConfig/routeConfig";
import {ThemeProvider, useTheme} from "@/app/providers/ThemeProvider";
import {AppRouter} from "@/app/providers/router";
import AppThemeSwitcher from "@/shared/ui/AppThemeSwitcher/AppThemeSwitcher";


function App() {
    const {theme} = useTheme()

    return (
        <div className={classNames('app', {}, [theme])}>
            <AppThemeSwitcher/>
            {
                Object.entries(RoutePaths).map(([key, path]) => (
                    <AppLink key={path} to={path}>
                        {key}
                    </AppLink>
                ))
            }
            <AppRouter/>
        </div>
    );
}

export default App;
