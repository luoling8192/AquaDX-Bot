import { createBot } from './bot';
import { Env } from './types';
import { createLogg, Format, LogLevel, setGlobalFormat, setGlobalLogLevel } from '@guiiai/logg';

setGlobalLogLevel(LogLevel.Debug);
setGlobalFormat(Format.Pretty);

const log = createLogg('Main').useGlobalConfig();

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		if (request.headers.get('X-Telegram-Bot-Api-Secret-Token') !== env.API_SECRET) {
			console.log('Secret-Token 错误');
			return new Response();
		}
		try {
			const req = await request.json();
			ctx.waitUntil(createBot(env).handleUpdate(req as any));
		} catch (e) {
			log.errorWithError('处理请求时发生错误', e);
		}
		return new Response();
	}
};

export { Renderer } from './renderer/Renderer';
