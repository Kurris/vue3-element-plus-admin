import { appsetting } from './appsettinglib'
import { UserManager, WebStorageStateStore, UserManagerSettings, Log } from 'oidc-client'

Log.logger = console
Log.level = appsetting.VITE_OIDC_LOG_LEVEL

/** 登录配置 */
const signInSettings: UserManagerSettings = {
	authority: appsetting.VITE_IDENTITYSERVER_AUTHORITY,
	client_id: 'spa',
	redirect_uri: location.origin + '/callback',
	post_logout_redirect_uri: location.origin + '/template',
	response_type: 'code',
	userStore: new WebStorageStateStore({ store: localStorage }),
	scope: 'openid profile offline_access weather:search',
	automaticSilentRenew: true,
}
/** 回调配置 */
const callbackSettings: UserManagerSettings = {
	response_mode: 'query',
	userStore: new WebStorageStateStore({ store: localStorage }),
}

/** 登录请求额外配置 */
export interface ISigninRedirectSettings {
	/** 登录用户名 */
	login_hint?: string

	/** idp:指定登录提供器 tenant:租户 */
	acr_values?: string
}

/** 登录管理对象 */
const userSignInManager = new UserManager(signInSettings)

/** 回调管理对象 */
const userCallbackManager = new UserManager(callbackSettings)

export { userSignInManager, userCallbackManager }
