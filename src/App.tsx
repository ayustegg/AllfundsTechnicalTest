import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import './App.css';

import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from './components/ui/navigation-menu';
import { Home } from './pages/Home';
import { News } from './pages/News';
import { Archived } from './pages/Archived';

function App() {

  return (
    <>
      <BrowserRouter>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/news">News</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/archived">Archived</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/archived" element={<Archived />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
