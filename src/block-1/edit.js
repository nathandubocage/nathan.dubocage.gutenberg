import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	RichText,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import { Placeholder, Button } from "@wordpress/components";
import "./editor.scss";

export default function Edit(props) {
	const blockProps = useBlockProps();

	const onChangeContent = (content) => {
		props.setAttributes({ content: content });
	};

	const onSelectImage = (picture) => {
		props.setAttributes({
			pictureID: picture.id,
			pictureURL: picture.url,
			pictureAlt: picture.alt,
		});
	};

	const onRemoveImage = () => {
		props.setAttributes({
			pictureID: null,
			pictureURL: null,
			pictureAlt: null,
		});
	};

	return (
		<div {...blockProps}>
			<div class="container-block-1">
				{!props.attributes.pictureID ? (
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectImage}
							allowedTypes={["image"]}
							value={props.attributes.pictureID}
							render={({ open }) => (
								<Placeholder
									icon="images-alt"
									label={__("Photo", "nathan.dubocage.gutenberg")}
									instructions={__(
										"Select a picture",
										"nathan.dubocage.gutenberg"
									)}
								>
									<Button isSecondary isLarge onClick={open} icon="upload">
										{__("Import", "nathan.dubocage.gutenberg")}
									</Button>
								</Placeholder>
							)}
						/>
					</MediaUploadCheck>
				) : (
					<p className="image-wrapper">
						<img
							src={props.attributes.pictureURL}
							alt={props.attributes.pictureAlt}
						/>

						{props.isSelected && (
							<Button
								className="remove-image"
								onClick={onRemoveImage}
								icon="dismiss"
							>
								{__("Remove picture", "nathan.dubocage.gutenberg")}
							</Button>
						)}
					</p>
				)}

				<RichText
					tagName="p"
					placeholder={__("Contenu à renseigner", "nathan.dubocage.gutenberg")}
					value={props.attributes.content}
					className="content"
					onChange={onChangeContent}
				/>
			</div>
		</div>
	);
}
