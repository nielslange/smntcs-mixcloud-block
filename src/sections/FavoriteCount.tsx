import { FaHeart } from 'react-icons/fa6';

interface FavoriteCountProps {
	favoriteCount?: number;
}

const FavoriteCount: React.FC< FavoriteCountProps > = ( { favoriteCount } ) => (
	<div className="flex-item">
		<FaHeart /> { favoriteCount }
	</div>
);

export default FavoriteCount;
