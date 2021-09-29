import Navigation from "./Navigation"
import Title from "./Title";

const MainPageLayout = ({ children }) => {
    return (
        <div>
            <Title title="BOX OFFICE" subtitle="Are you looking for a movie or actor"/>
            <Navigation />
            {children}
        </div>
    ); 
}

export default MainPageLayout;