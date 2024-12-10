import { Switch, Route } from 'wouter';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Home } from '@/pages/Home';
import { Stream } from '@/pages/Stream';
import { Categories } from '@/pages/Categories';
import { AppProvider } from '@/context/AppContext';

function App() {
  return (
    <AppProvider>
      <div className="flex flex-col h-screen bg-zinc-900 text-white">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/stream/:id" component={Stream} />
            <Route path="/categories" component={Categories} />
            <Route>404 Page Not Found</Route>
          </Switch>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
