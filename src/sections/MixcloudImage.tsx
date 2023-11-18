interface MixcloudImageProps {
	mixcloudData: {
		pictures?: {
			large?: string;
		};
		name?: string;
	};
}

const MixcloudImage: React.FC< MixcloudImageProps > = ( { mixcloudData } ) => (
	<img src={ mixcloudData?.pictures?.large } alt={ mixcloudData?.name } />
);

export default MixcloudImage;
