import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader, SongCard } from "../components";
import { useSelector } from "react-redux";

const PlaylistDetails = () => {
    const { playlistId } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const [songIds, setSongIds] = useState([]);
    const [songs, setSongs] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/playlists/songs/${playlistId}`);
                const fetchedSongIds = response.data.songIds;
                setSongIds(fetchedSongIds);
                const requests = fetchedSongIds.map((songId) => {
                    return axios.get('https://shazam.p.rapidapi.com/songs/v2/get-details', {
                        params: { id: songId, locale: 'en-US' },
                        headers: {
                            'x-rapidapi-key': import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY,
                            'x-rapidapi-host': 'shazam.p.rapidapi.com'
                        }
                    })
                });
                const responses = await Promise.all(requests);
                setSongs(responses.map(response => response.data));
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchSongs();
    }, [])

    const handleDeleteFromPlaylist = async (songId) => {
        try {
            await axios.post('http://localhost:5000/playlists/remove-song', { playlistId, songId });
            const updatedSongs = songs.filter((song) => song.data[0].id !== songId);
            setSongs(updatedSongs);
        } catch (error) {
            console.log(error);
        }
    }

    if (loading) {
        return <Loader title="Loading playlist songs..." />
    }

    if (songs.length === 0) {
        return (
            <div className="text-center text-white text-2xl font-bold mt-4">You haven't add any songs to this playlist</div>
        )
    }
    
    return (
        <div className="flex flex-row flex-wrap gap-8">
            {songs.map((song, i) => (
                <SongCard
                    key={i}
                    song={song.data[0]}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={songs}
                    i={i}
                    isPlaylistSong={true}
                    handleDeleteFromPlaylist={() => handleDeleteFromPlaylist(song.data[0].id)}
                />
            ))}
        </div>
    )
};

export default PlaylistDetails;