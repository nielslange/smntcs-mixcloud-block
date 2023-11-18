/**
 * External dependencies
 */
import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	TextControl,
	CheckboxControl,
	PanelBody,
	Disabled,
} from '@wordpress/components';
import { FaPlay, FaHeart, FaComment, FaUser, FaRetweet } from 'react-icons/fa6';

import './style.scss';
interface Props {
	attributes: {
		mixcloudUrl: string;
		showPlayCount: boolean;
		showFavoritesCount: boolean;
		showCommentsCount: boolean;
		showListenerCount: boolean;
		showRepostsCount: boolean;
	};
	setAttributes: ( attributes: Record< string, unknown > ) => void;
}

export const Edit = ( { attributes, setAttributes }: Props ): JSX.Element => {
	const {
		mixcloudUrl,
		showPlayCount,
		showFavoritesCount,
		showCommentsCount,
		showListenerCount,
		showRepostsCount,
	} = attributes;
	const [ mixcloudData, setMixcloudData ] = useState< any >( null );
	const [ isLoading, setIsLoading ] = useState( true );

	const fetchMixcloudData = async ( url: string ) => {
		if ( ! url ) return;

		const newUrl = new URL( url );
		const path = newUrl.pathname;

		setIsLoading( true );
		try {
			const response = await fetch( `https://api.mixcloud.com${ path }` );
			if ( ! response.ok ) {
				throw new Error( 'Network response was not ok' );
			}
			const data = await response.json();
			setMixcloudData( data );
		} catch ( error ) {
			console.error( 'Error fetching Mixcloud data:', error );
			setMixcloudData( null );
		} finally {
			setIsLoading( false );
		}
	};

	useEffect( () => {
		fetchMixcloudData( mixcloudUrl );
	}, [ mixcloudUrl ] );

	const onChangeUrl = ( url: string ) => {
		setAttributes( { mixcloudUrl: url } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Mixcloud Settings', 'your-text-domain' ) }
				>
					<TextControl
						label={ __( 'Mixcloud URL', 'your-text-domain' ) }
						value={ mixcloudUrl }
						onChange={ onChangeUrl }
					/>
					<CheckboxControl
						label={ __( 'Show play count', 'your-text-domain' ) }
						checked={ showPlayCount }
						onChange={ ( value ) =>
							setAttributes( { showPlayCount: value } )
						}
					/>
					<CheckboxControl
						label={ __(
							'Show favorites count',
							'your-text-domain'
						) }
						checked={ showFavoritesCount }
						onChange={ ( value ) =>
							setAttributes( { showFavoritesCount: value } )
						}
					/>
					<CheckboxControl
						label={ __(
							'Show comments count',
							'your-text-domain'
						) }
						checked={ showCommentsCount }
						onChange={ ( value ) =>
							setAttributes( { showCommentsCount: value } )
						}
					/>
					<CheckboxControl
						label={ __(
							'Show listener count',
							'your-text-domain'
						) }
						checked={ showListenerCount }
						onChange={ ( value ) =>
							setAttributes( { showListenerCount: value } )
						}
					/>
					<CheckboxControl
						label={ __( 'Show repost count', 'your-text-domain' ) }
						checked={ showRepostsCount }
						onChange={ ( value ) =>
							setAttributes( { showRepostsCount: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				{ isLoading ? (
					<>
						<p>{ __( 'Loading...', 'your-text-domain' ) }</p>
					</>
				) : (
					<Disabled>
						<div className="mixcloud-block-container">
							<div className="mixcloud-block-left-column">
								<img
									src={ mixcloudData.pictures.large }
									alt={ mixcloudData.name }
								/>
							</div>
							<div className="mixcloud-block-right-column">
								<h2>
									<a href={ mixcloudData.user.url }>
										{ mixcloudData.name }
									</a>
								</h2>
								<p>
									{ __( 'by', 'your-text-domain' ) }{ ' ' }
									<a href={ mixcloudData.user.url }>
										{ mixcloudData.user.name }
									</a>
								</p>

								{ mixcloudData.description && (
									<>
										<br />
										<p>{ mixcloudData.description }</p>
										<br />
									</>
								) }
								<div className="flex-container">
									{ showPlayCount && (
										<div className="flex-item">
											<FaPlay />{ ' ' }
											{ mixcloudData.play_count }
										</div>
									) }
									{ showFavoritesCount && (
										<div className="flex-item">
											<FaHeart />{ ' ' }
											{ mixcloudData.favorite_count }
										</div>
									) }
									{ showCommentsCount && (
										<div className="flex-item">
											<FaComment />{ ' ' }
											{ mixcloudData.comment_count }
										</div>
									) }
									{ showListenerCount && (
										<div className="flex-item">
											<FaUser />{ ' ' }
											{ mixcloudData.listener_count }
										</div>
									) }
									{ showRepostsCount && (
										<div className="flex-item">
											<FaRetweet />{ ' ' }
											{ mixcloudData.repost_count }
										</div>
									) }
								</div>
							</div>
						</div>
					</Disabled>
				) }
			</div>
		</>
	);
};
