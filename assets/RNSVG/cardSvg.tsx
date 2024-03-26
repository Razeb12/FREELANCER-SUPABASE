import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const CardSvg = (props: SvgProps) => (
	<Svg width={20} height={16} fill="none" {...props}>
		<Path
			fill="#4BAF4F"
			fillRule="evenodd"
			d="M0 3a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v1H0V3Zm0 3v7a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V6H0Zm5 2a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2H5Z"
			clipRule="evenodd"
		/>
	</Svg>
)
export default CardSvg
