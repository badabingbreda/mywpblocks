/**
 * resources used:
 * https://www.youtube.com/watch?v=O_4loYiEcbg
 */

/**
 * WordPress components that create the necessary UI elements for the block
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-components/
 */
 import { TextControl } from '@wordpress/components';

 /**
  * React hook that is used to mark the block wrapper element.
  * It provides all the necessary props like the class name.
  *
  * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
  */
 import { useBlockProps , createBlock } from '@wordpress/block-editor';
 
 const regex = /https\:\/\/youtu.be\/([\S]*)/;

 function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps();

    let image = null;
	let match = regex.exec( attributes.url );
    if( match !== null ) image = "https://img.youtube.com/vi/"+ match[1] +"/sddefault.jpg";

	return (
		<div { ...blockProps }>
            <div className="label">Youtube share URL</div>
			<div className="item">
				<div>
					{ image ? <img src={image} /> : null }
				</div>
				<div>
					<TextControl
						value={ attributes.url }
						onChange={ ( val ) => setAttributes( { url: val } ) }
					/>
				</div>
			</div>
		</div>
	);
}

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @param {Object} props            Properties passed to the function.
 * @param {Object} props.attributes Available block attributes.
 * @return {WPElement} Element to render.
 */
 function Save( { attributes } ) {
	const blockProps = useBlockProps.save();

	let match = regex.exec( attributes.url );
    if( match == null ) return <div data-url={attributes.url}>not a valid share url</div>;
	return <div { ...blockProps }> 
				<div className="youtube" data-embed={match[1]} data-url={attributes.url}>
					<div class="play-button"></div>
				</div>
			</div>;
}




export { Edit , Save , regex };