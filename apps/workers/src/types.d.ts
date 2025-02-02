import { CloudflareEnv } from '@clansty/maibot-types';
import { BrowserWorker } from '@cloudflare/puppeteer';
import { DurableObjectNamespace } from '@cloudflare/workers-types';

export type RENDER_REQUEST = {
	url: string,
	width: number
}

export type Env = CloudflareEnv & {
	MYBROWSER: BrowserWorker;
	RENDERER: DurableObjectNamespace;
}
