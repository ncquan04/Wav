import { useNavigate } from "react-router-dom";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();
  const artistId = track?.relationships?.artists.data[0].id;
  const { data: artistData, error, refetch } = useGetArtistDetailsQuery(artistId);

  if (error?.status === 429) {
    setTimeout(() => {
      refetch();
    }, 1000);
  }

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer" onClick={() => navigate(`/artists/${track?.relationships?.artists?.data[0]?.id}`)}>
      <img alt="artist" src={artistData?.data[0]?.attributes?.artwork?.url} className="w-full h-56 rounded-lg"/>
      <p className="mt-4 font-semibold text-lg text-white truncate">{artistData?.data[0]?.attributes?.name}</p>
    </div>
  )
};

export default ArtistCard;
