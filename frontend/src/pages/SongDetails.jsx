import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Loader, Error, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
    const dispatch = useDispatch();
    const { songid } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data: songData, isFetching: isFetchingSongDetails} = useGetSongDetailsQuery({ songid });
    const { data, isFetching: isFetchingRelatedSongs, error } = useGetSongRelatedQuery({ songid });
    const lyricsKey = songData?.resources?.lyrics ? Object.keys(songData.resources.lyrics)[0] : null;

    const handlePauseClick = () => {
        dispatch(playPause(false));
    }
    
    const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({ song, data, i }));
        dispatch(playPause(true));
    }
    
    if (isFetchingSongDetails || isFetchingRelatedSongs) return <Loader title="Searching song details" />;

    return (

        <div className="flex flex-col">
            <DetailsHeader artistId="" songData={songData}/>
            <div className="mb-10">
                <h2 className="text-white text-3xl font-bold">Lyrics: </h2>
                <div className="mt-5">
                    {songData?.resources?.lyrics ? songData?.resources?.lyrics[lyricsKey]?.attributes?.text.map((line, i) => (
                        <p className="text-gray-400 text-base my-1">{line}</p>
                    )) : <p className="text-gray-400 text-base my-1">No lyrics found</p>} 
                </div>
            </div>
            <RelatedSongs
                data={data}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
                error={error}
            />
        </div>
    )
};

export default SongDetails;
