import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import { HiCheckCircle } from "react-icons/hi";

const AddToPlaylistModal = ({ song, setIsAddingToPlaylist }) => {
    const { user } = useSelector((state) => state.auth);
    const [playlists, setPlaylists] = useState([]);
    const [error, setError] = useState(null);
    const [added, setAdded] = useState(false);

    const handleSubmit = async () => {
        const playlistId = document.getElementById('playlist').value;
        try {
            await axios.post('http://localhost:5000/playlists/add-song', { playlistId, songId: song?.id ? song.id : song.hub.actions[0].id });
            setAdded(true);
            setTimeout(() => {
                setIsAddingToPlaylist(false);
            }, 3000)
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong');
        }
    }

    const handleCancel = () => {
        setIsAddingToPlaylist(false);
    }

    const TimedNotification = ({ element, duration = 1000 }) => {
        const [isVisible, setIsVisible] = useState(true);
    
        useEffect(() => {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, duration);
    
            return () => clearTimeout(timer);
        }, [duration]);
    
        return isVisible ? element : null;
    };

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const res = await axios.post('http://localhost:5000/playlists', { userId: user.id });
                setPlaylists(res.data.playlists);
            } catch (error) {
                console.log(error);
            }
        }
        fetchPlaylists();
    }, []);

    return (
        added ? 
        <TimedNotification 
            element={
                <div className="w-full h-full flex flex-col justify-center items-center animate-slowfade">
                    <HiCheckCircle className="text-3xl text-green-500"/>
                    <span className="text-base font-semibold text-green-500">Song added to your playlist</span>
                </div>
            } 
            duration={3000} 
        /> :
        <div className="w-full h-full flex flex-col justify-center items-center">
            {error && <p className="text-base font-semibold mb-4 text-red-500">{error}</p>}
            <select className="w-full bg-black text-gray-300 p-3 text-base rounded-lg outline-none sm:mt-0 mb-4" name="playlist" id="playlist">
                {playlists.map((playlist, index) => {
                    return (
                        <option key={index} value={playlist.id}>{playlist.name}</option>
                    )
                })}
            </select>
            <button className="w-full p-2 font-semibold bg-cyan-400 text-white rounded hover:opacity-70 mb-4" onClick={handleSubmit}>Add to playlist</button>
            <button className="w-full p-2 font-semibold bg-red-400 text-white rounded hover:opacity-70 mb-4" onClick={handleCancel}>Cancel</button>
        </div>
    )
};

export default AddToPlaylistModal;