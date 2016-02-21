export const supportedTypes = [
	"application/pdf",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	"application/msword",
	"application/vnd.oasis.opendocument.text",
	"image/png",
	"application/rtf",
	"image/jpeg"
];

export default function (req, file, cb) {
	const mimetype = file.mimetype;

	if (supportedTypes.indexOf(mimetype) === -1) {
		cb(new Error(`File format ${mimetype} not supported`));
	} else {
		cb(null, true);
	}
}
