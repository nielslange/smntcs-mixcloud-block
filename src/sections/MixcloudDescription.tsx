interface MixcloudDescriptionProps {
	mixcloudData: {
		description?: string;
	};
}

const MixcloudDescription: React.FC< MixcloudDescriptionProps > = ( {
	mixcloudData,
} ) => (
	<>
		{ mixcloudData?.description && (
			<>
				<br />
				<p>{ mixcloudData?.description }</p>
				<br />
			</>
		) }
	</>
);

export default MixcloudDescription;
