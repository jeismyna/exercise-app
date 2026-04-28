import { Route, Routes } from "react-router-dom";

import ROUTES from "../../models/routes-model"

import HomePage from "../pages/HomePage";
import ReviewsPage from "../pages/ReviewsPage"
import FuturePage from "../pages/FuturePage";

export default function Router() {
    return (
        <Routes>
            <Route path={ROUTES.ROOT} element={<HomePage />} />
            <Route path={ROUTES.REVIEWS} element={<ReviewsPage />} />
            <Route path={ROUTES.TBD} element={<FuturePage />} />
        </Routes>
    );
}