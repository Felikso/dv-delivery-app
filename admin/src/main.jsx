import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { SkeletonTheme } from 'react-loading-skeleton';

ReactDOM.createRoot(document.getElementById('root')).render(
	<StrictMode>
		<SkeletonTheme baseColor="#313131" highlightColor="#525252">
		<BrowserRouter>
			<App />
		</BrowserRouter>
		</SkeletonTheme>
	</StrictMode>
);
