import { Routes, Route } from 'react-router-dom';
import MainPageConnector from './MainPage/MainPageConnector';
import MainPage from './MainPage/MainPage';

function ComponentsManager() {
    return (
        <MainPage />
        // <Routes>
        //     {/* <Route path="/" element={<MainPageConnector />} /> */}
        // </Routes>
    );
}

export default ComponentsManager;