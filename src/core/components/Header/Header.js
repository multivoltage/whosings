import React, { useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";

const Header = ({
  user,
  game,
  showLoginLayer,
  signOut,
  requestEndGame,
  requestStopGame
}) => {
  const isGuest = user.name.length === 0;
  const [menuOpened, setMenuOpened] = useState(false);

  const handleItemClick = e => {
    setMenuOpened(!menuOpened);
    if (game.state === "running") {
      requestEndGame();
    } else {
      requestStopGame();
    }
  };

  return (
    <header className="pageHeader">
      <img
        onClick={() => {
          setMenuOpened(!menuOpened);
        }}
        className="icon-menu"
        srcSet="
        ./assets/2x/outline_menu_white_48dp.png 2x,
        ./assets/1x/outline_menu_white_48dp.png 1x
        "
      />

      {isGuest && (
        <ul className={`pageHeader--list ${menuOpened ? "visible" : ""}`}>
          <li>
            <button onClick={showLoginLayer}>Login</button>
          </li>
          <li>
            <Link to="/stats">Top players</Link>
          </li>
        </ul>
      )}

      {!isGuest && (
        <ul className={`pageHeader--list ${menuOpened ? "visible" : ""}`}>
          <li onClick={handleItemClick}>
            <Link to="/profile">My games</Link>
          </li>
          <li onClick={handleItemClick}>
            <Link to="/stats">Top players</Link>
          </li>
          <li onClick={handleItemClick}>
            <Link to="/quiz">Quiz</Link>
          </li>
          <li>
            Hello <span className="pageHeader--name">{user.name}!</span>
          </li>
          <li onClick={handleItemClick}>
            <button className="pageHeader--action" onClick={signOut}>
              Logout
            </button>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;
