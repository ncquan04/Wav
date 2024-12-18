import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SongCard } from "../components";
import { useSelector } from "react-redux";

const PlaylistDetails = () => {
    const { playlistId } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const [songIds, setSongIds] = useState([]);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/playlists/songs/${playlistId}`);
                const fetchedSongIds = response.data.songIds;
                setSongIds(fetchedSongIds);
                fetchedSongIds.forEach(async (songId, index) => {
                    try {
                        const options = {
                            method: 'GET',
                            url: 'https://shazam.p.rapidapi.com/songs/v2/get-details',
                            params: {
                                id: songId,
                                l: 'en-US'
                            },
                            headers: {
                                'x-rapidapi-key': '54c8faa2fbmsh08a94c147fd669ep18519djsn17d5685dbbe3',
                                'x-rapidapi-host': 'shazam.p.rapidapi.com'
                            }
                        };
                        const response = await axios.request(options);
                        setSongs((prev) => [...prev, response.data]);
                    } catch (error) {
                        console.log(error);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
        fetchSongs();
    }, [])
    
    return (
        <div className="flex flex-row flex-wrap gap-8">
            {songs.map((song, i) => (
                <SongCard
                    key={song.id}
                    song={song.data[0]}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={songs}
                    i={i}
                />
            ))}
        </div>
    )
};

export default PlaylistDetails;