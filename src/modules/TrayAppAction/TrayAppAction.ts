export enum TrayAppActions {
    OPEN_PATH = 'open-path',
    CODE = 'code',
}

export type CodeTrayAppAction = {
    type: TrayAppActions.CODE,
    configuration: {
        code: string
    }
}

export type OpenPathTrayAppAction = {
    type: TrayAppActions.OPEN_PATH,
    configuration: {
        path: string
    }
}

export type TrayAppAction = { type: TrayAppActions } & (CodeTrayAppAction | OpenPathTrayAppAction)
