import { TrayAppAction, TrayAppActions } from "../TrayAppAction";

export const TauriTrayAppActionExecutor = {
    execute(action: TrayAppAction) {
        switch (action.type) {
            case TrayAppActions.OPEN_URL:
                this.openUrl(action.configuration.url);
                break;
            case TrayAppActions.OPEN_PATH:
                this.openPath(action.configuration.path);
                break;
        }
    },

    openUrl: (url: string) => {
        window.open(url);
    },

    openPath: (path: string) => {
        window.open(path);
    }
}
