import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const BackSvg = (props: SvgProps) => (
	<Svg width={24} height={24} fill="none" {...props}>
		<Path
			stroke="#000"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={4}
			d="m15.5 18-6-6 6-6"
		/>
	</Svg>
)
export default BackSvg
