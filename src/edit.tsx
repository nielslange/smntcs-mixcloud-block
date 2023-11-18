import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	BlockControls,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	Button,
	Disabled,
	PanelBody,
	Placeholder,
	ToolbarGroup,
	ToggleControl,
	__experimentalHStack as HStack,
	__experimentalInputControl as InputControl,
} from '@wordpress/components';
import { edit, audio } from '@wordpress/icons';
import { prependHTTP } from '@wordpress/url';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import './style.scss';
import {
	MixcloudImage,
	MixcloudNameLink,
	MixcloudUserInfo,
	MixcloudDescription,
	MixcloudStats,
} from './sections/';

interface Props {
	attributes: {
		mixcloudUrl: string;
		mixcloudData: any;
		linkShowName: boolean;
		showCreatorName: boolean;
		linkCreatorName: boolean;
		showPlayCount: boolean;
		showFavoritesCount: boolean;
		showCommentsCount: boolean;
		showListenerCount: boolean;
		showRepostsCount: boolean;
	};
	setAttributes: ( attributes: Record< string, unknown > ) => void;
}

export const Edit = ( { attributes, setAttributes }: Props ): JSX.Element => {
	const [ isEditing, setIsEditing ] = useState( ! attributes.mixcloudUrl );
	const [ isLoading, setIsLoading ] = useState( false );

	const {
		mixcloudUrl,
		mixcloudData,
		linkShowName,
		showCreatorName,
		linkCreatorName,
		showPlayCount,
		showFavoritesCount,
		showCommentsCount,
		showListenerCount,
		showRepostsCount,
	} = attributes;

	const toggleAttribute = ( propName: string ) => () => {
		setAttributes( {
			...attributes,
			[ propName ]: ! attributes[ propName ],
		} );
	};

	const onSubmitURL = ( event: React.FormEvent ) => {
		event.preventDefault();
		if ( mixcloudUrl ) {
			setAttributes( {
				...attributes,
				mixcloudUrl: prependHTTP( mixcloudUrl ),
			} );
			setIsEditing( false );
		}
	};

	useEffect( () => {
		const fetchMixcloudData = async ( url: string ) => {
			if ( ! url ) {
				setIsLoading( false );
				return;
			}

			setIsLoading( true );
			try {
				const response = await fetch(
					`https://api.mixcloud.com${ new URL( url ).pathname }`
				);
				if ( ! response.ok ) {
					throw new Error( 'Network response was not ok' );
				}

				const data = await response.json();
				setAttributes( {
					...attributes,
					mixcloudData: data,
				} );
			} catch ( error ) {
				console.error( error ); // Log the error for debugging
				setAttributes( { ...attributes, mixcloudData: null } );
			} finally {
				setIsLoading( false );
			}
		};

		fetchMixcloudData( mixcloudUrl );
	}, [ mixcloudUrl ] );

	const blockProps = useBlockProps();

	const toolbarControls = [
		{
			icon: edit,
			title: __( 'Edit Mixcloud URL' ),
			onClick: () => setIsEditing( true ),
		},
	];

	const toggleControls = [
		{
			key: 'linkShowName',
			label: __( 'Link Show Name', 'smntcs-mixcloud-block' ),
		},
		{
			key: 'showCreatorName',
			label: __( 'Show Creator Name', 'smntcs-mixcloud-block' ),
		},
		{
			key: 'linkCreatorName',
			label: __( 'Link Creator Name', 'smntcs-mixcloud-block' ),
		},
		{
			key: 'showPlayCount',
			label: __( 'Show Play Count', 'smntcs-mixcloud-block' ),
		},
		{
			key: 'showFavoritesCount',
			label: __( 'Show Favorites Count', 'smntcs-mixcloud-block' ),
		},
		{
			key: 'showCommentsCount',
			label: __( 'Show Comments Count', 'smntcs-mixcloud-block' ),
		},
		{
			key: 'showListenerCount',
			label: __( 'Show Listener Count', 'smntcs-mixcloud-block' ),
		},
		{
			key: 'showRepostsCount',
			label: __( 'Show Reposts Count', 'smntcs-mixcloud-block' ),
		},
	];

	const onChangeUrl = ( url: string ) => {
		setAttributes( { ...attributes, mixcloudUrl: url } );
	};

	if ( isEditing ) {
		return (
			<div { ...blockProps }>
				<Placeholder icon={ audio } label="SMNTCS Mixcloud Block">
					<form
						onSubmit={ onSubmitURL }
						className="wp-block-rss__placeholder-form"
					>
						<HStack wrap>
							<InputControl
								__next40pxDefaultSize
								placeholder={ __( 'Enter URL here…' ) }
								value={ mixcloudUrl }
								onChange={ ( value ) => onChangeUrl( value ) }
								className="wp-block-rss__placeholder-input"
							/>
							<Button
								__next40pxDefaultSize
								variant="primary"
								type="submit"
							>
								{ __( 'Use URL' ) }
							</Button>
						</HStack>
					</form>
				</Placeholder>
			</div>
		);
	}

	if ( isLoading ) {
		return (
			<div { ...blockProps }>
				<div className="mixcloud-block-container">
					<div className="mixcloud-block-left-column">
						<Skeleton height={ 200 } />
					</div>
					<div className="mixcloud-block-right-column">
						<Skeleton height={ 30 } />
						<br />
						<Skeleton count={ 5 } />
					</div>
				</div>
			</div>
		);
	}

	const renderMixcloudData = () => {
		if ( ! mixcloudData ) return <div>No data available</div>;

		return (
			<div className="mixcloud-block-container">
				<div className="mixcloud-block-left-column">
					<MixcloudImage mixcloudData={ mixcloudData } />
				</div>
				<div className="mixcloud-block-right-column">
					<MixcloudNameLink
						mixcloudData={ mixcloudData }
						linkShowName={ linkShowName }
					/>
					<MixcloudUserInfo
						mixcloudData={ mixcloudData }
						showCreatorName={ showCreatorName }
						linkCreatorName={ linkCreatorName }
					/>
					<MixcloudDescription mixcloudData={ mixcloudData } />
					<MixcloudStats
						mixcloudData={ mixcloudData }
						showPlayCount={ showPlayCount }
						showFavoritesCount={ showFavoritesCount }
						showCommentsCount={ showCommentsCount }
						showListenerCount={ showListenerCount }
						showRepostsCount={ showRepostsCount }
					/>
				</div>
			</div>
		);
	};

	return (
		<>
			<BlockControls>
				<ToolbarGroup controls={ toolbarControls } />
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={ __( 'Mixcloud Settings', 'smntcs-mixcloud-block' ) }
				>
					{ toggleControls.map( ( control ) => (
						<ToggleControl
							key={ control.key }
							label={ control.label }
							checked={ attributes[ control.key ] }
							onChange={ toggleAttribute( control.key ) }
						/>
					) ) }
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<Disabled>{ renderMixcloudData() }</Disabled>
			</div>
		</>
	);
};
