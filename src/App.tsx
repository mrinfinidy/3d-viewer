import React from 'react';
import Login from './pages/Login';
import Viewport from './pages/Viewport';

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const loginSusccess = () => {
        setIsLoggedIn(true);
    };

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            {isLoggedIn ? (
                <Viewport />
            ) : (
                <Login loginSuccess={loginSusccess} />
            )}
        </div>
    );
}

export default App;
