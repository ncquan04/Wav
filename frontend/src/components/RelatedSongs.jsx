import SongBar from './SongBar';
import { Error } from '../components'

const RelatedSongs = ({data, isPlaying, activeSong, artistId, error}) => {
  console.log(data);

  if (error) {
    return (
      <div className='flex flex-col'>
        <h1 className='font-bold text-3xl text-white'>Related Songs</h1>
        <div className='w-full sm:h-8 h-4'/>
        <Error/>
      </div>
    )
  }

  return (
    <div className='flex flex-col'>
      <h1 className='font-bold text-3xl text-white'>Related Songs:</h1>
      <div className='mt-4 w-full flex flex-col'>
        {data?.map((song, i) => (
          <SongBar
            key={i}
            song={song}
            i={i}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
          />
        ))}
      </div>
    </div>
  )
};

export default RelatedSongs;
