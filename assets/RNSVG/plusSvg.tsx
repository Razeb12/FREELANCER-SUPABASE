import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const PlusSvg = (props: SvgProps) => (
	<Svg width={14} height={14} fill="none" {...props}>
		<Path
			fill="#4BAF4F"
			d="M7 0a7.086 7.086 0 0 0-7 7 7.086 7.086 0 0 0 7 7 7.086 7.086 0 0 0 7-7 7.086 7.086 0 0 0-7-7Zm4 7.5H7.5V11h-1V7.5H3v-1h3.5V3h1v3.5H11v1Z"
		/>
	</Svg>
)
export default PlusSvg
