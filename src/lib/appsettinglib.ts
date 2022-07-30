/**系统配置*/
const setting = {
	/** 请求网关地址*/
	VITE_GATEWAY_APIURL: import.meta.env.VITE_GATEWAY_APIURL as string,

	/** identity server url*/
	VITE_IDENTITYSERVER_AUTHORITY: import.meta.env.VITE_IDENTITYSERVER_AUTHORITY as string,

	/** oidc-client-js log level NONE: 0;ERROR: 1;WARN: 2;INFO: 3;DEBUG: 4;*/
	VITE_OIDC_LOG_LEVEL: Number.parseInt(import.meta.env.VITE_OIDC_LOG_LEVEL as string),
}

//dev输出配置
if (import.meta.env.DEV) {
	console.log('系统配置:\r\n' + JSON.stringify(setting, null, 4))
}
export const appsetting = setting
