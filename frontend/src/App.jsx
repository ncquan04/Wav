import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Searchbar, Sidebar, MusicPlayer, TopPlay } from './components';
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts } from './pages';
import Login from './pages/Login';
import Register from './pages/Register';
import Playlists from './pages/Playlists';
import PlaylistDetails from './pages/PlaylistDetails';
import FavoriteArtists from './pages/FavoriteArtists';

const App = () => {
  const { activeSong } = useSelector((state) => state.player);
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div className="relative flex">
      {isLoggedIn && <Sidebar />}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        {isLoggedIn && <Searchbar />}

        <div className={`px-6 ${isLoggedIn ? 'h-[calc(100vh-72px)]' : ''} overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse`}>
          <div className="flex-1 h-fit pb-40">
            <Routes>
              {!isLoggedIn ? 
              (
                <>
                  <Route path='*' element={<Navigate to="/login" replace />}/>
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />}/>
                </>
              )
              :
              (
                <>
                  <Route path="/" element={<Navigate to='/discover' replace />} />
                  <Route path="/discover" element={<Discover />} />
                  <Route path="/top-artists" element={<TopArtists />} />
                  <Route path="/top-charts" element={<TopCharts />} />
                  <Route path="/around-you" element={<AroundYou />} />
                  <Route path="/playlists" element={<Playlists />} />
                  <Route path="/favoritesArtists" element={<FavoriteArtists />} />
                  <Route path="/playlists/:playlistId" element={<PlaylistDetails />} />
                  <Route path="/artists/:id" element={<ArtistDetails />} />
                  <Route path="/songs/:songid" element={<SongDetails />} />
                  <Route path="/search/:searchTerm" element={<Search />} />
                </>
              )}
            </Routes>
          </div>
          {isLoggedIn && <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
          </div>}
        </div>
      </div>

      {isLoggedIn && (activeSong?.attributes?.name || activeSong?.title) && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
