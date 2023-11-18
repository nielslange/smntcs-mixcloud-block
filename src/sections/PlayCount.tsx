import { FaPlay } from 'react-icons/fa6';

interface PlayCountProps {
	playCount?: number;
}

const PlayCount: React.FC< PlayCountProps > = ( { playCount } ) => (
	<div className="flex-item">
		<FaPlay /> { playCount }
	</div>
);

export default PlayCount;
