import React from 'react';

export default (element: React.ReactElement) =>
	<html>
	<head>
		<meta charSet="utf-8" />
		<meta name="referrer" content="no-referrer" />
		<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&family=Quicksand:wght@300..700&family=Reddit+Mono&display=swap" rel="stylesheet" />
	</head>
	<body style={{
		padding: 0, margin: 0,
		background: '#51bcf3',
		fontFamily: 'Quicksand, "Noto Sans SC", sans-serif'
	}}>
	{element}
	<div style={{ backgroundColor: '#55ab37', marginTop: 50 }}>
		<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ height: 50, width: '100%' }}>
			<defs>
				<pattern id="myPattern" x="0" y="0" width="480" height="50" patternUnits="userSpaceOnUse">
					<path d="M0,0 v25 q5,5 10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 t10,0 v-25 Z" fill="#7cbc29"></path>
				</pattern>
			</defs>
			<rect fill="url(#myPattern)" height={45} width="100%" />
		</svg>
		<div style={{ textAlign: 'center', color: 'white', paddingBottom: 25, fontSize: 20 }}>
			Rating on AquaDX.Net | Designed by Clansty feat. 7Yunluo | Generated by @AquaDXBot | Data from DXRating.net
		</div>
	</div>
	</body>
	</html>
