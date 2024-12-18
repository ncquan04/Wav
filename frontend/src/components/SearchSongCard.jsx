import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { useState } from "react";
import AddToPlaylistModal from "./AddToPlaylistModal";

const SearchSongCard = ({ song, isPlaying, activeSong, i, data }) => {
    const dispatch = useDispatch();
    const [isAddingToPlaylist, setIsAddingToPlaylist] = useState(false);

    const handlePauseClick = () => {
        dispatch(playPause(false));
    }

    const handlePlayClick = () => {
        dispatch(setActiveSong({ song, data, i }));
        dispatch(playPause(true));
    }

    const handleAddClick = () => {
        setIsAddingToPlaylist(true);
    }

    return (
        <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
            {isAddingToPlaylist ? <AddToPlaylistModal song={song} setIsAddingToPlaylist={setIsAddingToPlaylist} /> :
                <>
                    <div className="relative w-full h-56 group">
                        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${((activeSong?.attributes?.name === song?.title || activeSong?.title === song?.title) && (activeSong?.attributes?.artistName === song?.subtitle || activeSong?.subtitle === song?.subtitle)) ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
                            <PlayPause
                                song={song}
                                isPlaying={isPlaying}
                                activeSong={activeSong}
                                handlePause={handlePauseClick}
                                handlePlay={handlePlayClick}
                            />
                        </div>
                        <img alt="song_img" src={song.images.coverart} />
                    </div>
                    <div className="flex flex-row justify-between">
                        <div className="w-[80%] mt-4 flex flex-col">
                            <p className="font-semibold text-lg text-white truncate hover:underline">
                                <Link to={`/songs/${song?.hub.actions[0].id}`}>
                                    {song.title}
                                </Link>
                            </p>
                            <p className="text-sm truncate text-gray-300 mt-1 hover:underline">
                                <Link to={song.artists ? `/artists/${song.artists[0].adamid}` : '/top-artists'}>
                                    {song.subtitle}
                                </Link>
                            </p>
                        </div>
                        <HiOutlinePlusCircle className="mt-auto text-2xl text-gray-500 hover:text-white cursor-pointer" onClick={handleAddClick} />
                    </div>
                </>}
        </div>
    )
};

export default SearchSongCard;
