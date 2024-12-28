import { TrayAppAction, TrayAppActions } from "../TrayAppAction";
import { open } from "@tauri-apps/plugin-shell";

export const TauriTrayAppActionExecutor = {
    execute(action: TrayAppAction) {
        switch (action.type) {
            // case TrayAppActions.OPEN_URL:
            //     this.openUrl(action.configuration.url);
            //     break;
            case TrayAppActions.OPEN_PATH:
                this.openPath(action.configuration.path);
                break;
        }
    },

    openUrl: (url: string) => {
        open(url);
    },

    openPath: (path: string) => {
        open(path);
    }
}
