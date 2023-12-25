import './styles/main.scss'
import {classNames} from "@/shared/lib/classNames/classNames";
import {useTheme} from "@/app/providers/ThemeProvider";
import {AppRouter} from "@/app/providers/router";
import {NavigationBar} from "@/widgets/NavigationBar";
// @ts-ignore
import IconsSprite from "@/shared/assets/iconsSprite";
import {Suspense} from "react";
function App() {
    const {theme} = useTheme()

    return (
        <Suspense fallback="">
            <div className={classNames('app', {}, [theme])}>
                <IconsSprite/>
                <NavigationBar/>
                <main className="main">
                    <AppRouter/>
                </main>
            </div>
        </Suspense>
    );
}

export default App;
