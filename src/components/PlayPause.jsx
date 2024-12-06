import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'

const PlayPause = ({isPlaying, activeSong, song, handlePause, handlePlay}) => (
  (isPlaying && ((activeSong?.attributes?.name ? activeSong?.attributes?.name : activeSong?.title) === (song?.attributes?.name ? song?.attributes?.name : song?.title)) && ((activeSong?.attributes?.artistName ? activeSong?.attributes?.artistName : activeSong?.subtitle) === (song?.attributes?.artistName ? song?.attributes?.artistName : song?.subtitle))) ?
  (<FaPauseCircle
    size={35}
    className='text-gray-300'
    onClick={handlePause}
  />)
  :
  (<FaPlayCircle
    size={35}
    className='text-gray-300'
    onClick={handlePlay}
  />)
  )
;

export default PlayPause;
