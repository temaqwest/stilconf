import './styles/main.scss'
import {classNames} from "@/shared/lib/classNames/classNames";
import {useTheme} from "@/app/providers/ThemeProvider";
import {AppRouter} from "@/app/providers/router";
import {NavigationBar} from "@/widgets/NavigationBar";
// @ts-ignore
import IconsSprite from "@/shared/assets/iconsSprite";
function App() {
    const {theme} = useTheme()

    return (
        <div className={classNames('app', {}, [theme])}>
            <IconsSprite/>
            <NavigationBar/>
            <main className="main">
                <AppRouter/>
            </main>
        </div>
    );
}

export default App;
