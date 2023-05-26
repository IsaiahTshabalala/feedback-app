import Header from "./components/Header";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackStats from './components/FeedbackStats';
import FeedbackList from "./components/FeedbackList";
import About from "./components/about/About";
import Card from "./components/shared/Card";
import Post from "./components/Post";
import ErrorPage from "./components/ErrorPage";
import PleaseWait from "./components/PleaseWait";
import "./index.css";
import { FeedbackProvider } from "./context/FeedbackProvider";

import FeedbackData from "./data/FeedbackData";

import { NavLink, createBrowserRouter, RouterProvider} from "react-router-dom";
import { FaQuestion } from "react-icons/fa";

function App(){

    return (
        <div className="container">
            <FeedbackProvider>
                <RouterProvider
                    router={createBrowserRouter(
                    [
                        {
                            path: "/",
                            element: 
                                <>
                                    <Header text="Feedback UI" />
                                    <FeedbackForm/>
                                    <Card>
                                        <NavLink className="about-link" to="/about">About<FaQuestion/></NavLink>
                                    </Card>
                                    <FeedbackStats/>
                                    <FeedbackList/>
                                </>,
                            errorElement: <ErrorPage/>
                        },
                        {
                            path: '/about',
                            element: <About/>
                        },
                        {
                            path: '/post/:id/:name',
                            element: <Post/>,
                            errorElement: <ErrorPage/>
                        }
                    ]
                    )}
                    fallbackElement={<PleaseWait/>}
                />
            </FeedbackProvider>
        </div>
    );
} // function App()

export default App;