import {
	PlayCount,
	FavoriteCount,
	CommentCount,
	ListenerCount,
	RepostCount,
} from './index';

interface MixcloudStatsProps {
	mixcloudData: {
		play_count?: number;
		favorite_count?: number;
		comment_count?: number;
		listener_count?: number;
		repost_count?: number;
	};
	showPlayCount: boolean;
	showFavoritesCount: boolean;
	showCommentsCount: boolean;
	showListenerCount: boolean;
	showRepostsCount: boolean;
}

const MixcloudStats: React.FC< MixcloudStatsProps > = ( {
	mixcloudData,
	showPlayCount,
	showFavoritesCount,
	showCommentsCount,
	showListenerCount,
	showRepostsCount,
} ) => (
	<div className="flex-container">
		{ showPlayCount && <PlayCount playCount={ mixcloudData.play_count } /> }
		{ showFavoritesCount && (
			<FavoriteCount favoriteCount={ mixcloudData.favorite_count } />
		) }
		{ showCommentsCount && (
			<CommentCount commentCount={ mixcloudData.comment_count } />
		) }
		{ showListenerCount && (
			<ListenerCount listenerCount={ mixcloudData.listener_count } />
		) }
		{ showRepostsCount && (
			<RepostCount repostCount={ mixcloudData.repost_count } />
		) }
	</div>
);

export default MixcloudStats;
