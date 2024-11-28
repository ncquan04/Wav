import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Loader, Error, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
    const dispatch = useDispatch();
    const { songid } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data: songData, isFetching: isFetchingSongDetails} = useGetSongDetailsQuery({ songid });

    return (
        <div className="flex flex-col">
            {/* <DetailsHeader artistId={artistId} songData={songData}/> */}
            <div className="mb-10">
                <h2 className="text-white text-3xl font-bold">Lyrics: </h2>
                <div className="mt-5">
                    {songData?.resources?.songs?.attributes?.hasLyrics ? songData?.lyrics.attributes.text.map((line, i) => (
                        <p className="text-gray-400 text-base my-1">{line}</p>
                    )) : <p className="text-gray-400 text-base my-1">No lyrics found</p>} 
                </div>
            </div>
        </div>
    )
};

export default SongDetails;
