export const enum TrayAppActions {
    OPEN_URL = 'open-url',
    OPEN_PATH = 'open-path'
}

export type OpenUrlTrayAppAction = {
    type: TrayAppActions.OPEN_URL,
    configuration: {
        url: string
    }
}

export type OpenPathTrayAppAction = {
    type: TrayAppActions.OPEN_PATH,
    configuration: {
        path: string
    }
}

export type TrayAppAction = { type: TrayAppActions } & (OpenUrlTrayAppAction | OpenPathTrayAppAction)
