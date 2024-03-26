import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const GreenStarSvg = (props: SvgProps) => (
	<Svg width={24} height={24} fill="none" {...props}>
		<Path
			fill="#4BAF4F"
			d="m23.4 10.533-4.828 4.215 1.446 6.274a1.713 1.713 0 0 1-2.553 1.857l-5.472-3.32-5.46 3.32a1.713 1.713 0 0 1-2.553-1.857l1.444-6.268-4.83-4.22a1.713 1.713 0 0 1 .976-3.005l6.366-.551 2.485-5.928a1.708 1.708 0 0 1 3.152 0l2.493 5.928 6.364.551a1.713 1.713 0 0 1 .976 3.004H23.4Z"
		/>
	</Svg>
)
export default GreenStarSvg
